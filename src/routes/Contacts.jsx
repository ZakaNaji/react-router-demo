import { Form, redirect, useFetcher, useLoaderData } from "react-router-dom";
import { deleteContact, getContact, updateContact } from "../contacts";

export default function Contacts() {
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}

export async function loader({ params }) {
  const contact = await getContact(params.id);
  if (!contact) {
    throw new Response("Not found", { status: 404, statusText: "Not found" });
  }
  return { contact };
}

export async function action({ request, params }) {
  console.log(request, params);
  const formData = await request.formData();
  const body = Object.fromEntries(formData.entries());
  await updateContact(params.id, body);
  return redirect(`/contacts/${params.id}`);
}

export async function destroy({ params }) {
  await deleteContact(params.id);
  return redirect("/");
}

export async function favoriteAction({ request, params }) {
  const formData = await request.formData();
  const body = formData.get("favorite") === "true";
  return updateContact(params.id, { favorite: body });
}
