import Label from "./label";

export default async function HermaA49642({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <Label slug={slug}></Label>;
}
