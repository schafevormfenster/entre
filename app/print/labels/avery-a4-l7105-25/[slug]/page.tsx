import Label from "./label";

export default async function AveryA4L710525({
  params,
}: {
  params: { slug: string };
}) {
  return <Label slug={params.slug}></Label>;
}
