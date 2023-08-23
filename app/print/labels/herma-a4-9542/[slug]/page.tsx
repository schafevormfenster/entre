import Label from "./label";

export default async function HermaA49642({
  params,
}: {
  params: { slug: string };
}) {
  return <Label slug={params.slug}></Label>;
}
