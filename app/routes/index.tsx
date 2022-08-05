import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import type { Post } from "~/services/posts.server";
import { createPost } from "~/services/posts.server";
import { getPosts } from "~/services/posts.server";
import { Post as PostComponent } from "~/components/Post";
import { PostForm } from "~/components/PostForm";
import { CreatePost } from "~/services/validations";

type LoaderData = {
  posts: Post[];
};
type ActionData = {
  error: {
    formErrors?: string[];
    fieldErrors?: {
      title?: string[];
      body?: string[];
    };
  };
  fields: {
    title?: string;
    body?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const rawTitle = form.get("title");
  const rawBody = form.get("body");
  const result = CreatePost.safeParse({ title: rawTitle, body: rawBody });
  if (!result.success) {
    return json(
      {
        erorr: result.error.flatten(),
        fields: {
          title: rawTitle,
          body: rawBody,
        },
      },
      { status: 400 }
    );
  }
  await createPost({
    title: result.data.title ?? null,
    body: result.data.body,
  });

  return redirect("/");
};

export const loader: LoaderFunction = async () => {
  const data: LoaderData = { posts: await getPosts() };
  return json(data);
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();
  const formData = useActionData<ActionData>();
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <PostForm
        action="/?index"
        error={formData?.error}
        fields={formData?.fields}
      />
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <PostComponent header={post.title} children={post.body} />
          </li>
        ))}
      </ul>
    </div>
  );
}
