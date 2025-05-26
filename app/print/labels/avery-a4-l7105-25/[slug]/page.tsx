import Label from "./label";

export default async function AveryA4L710525({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <Label slug={slug}></Label>;
}