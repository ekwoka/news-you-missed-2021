export default function ArticlePreview(title, img) {
  return (
    <div>
      <img src={img} alt={title} class="w-full object-cover" />
      <h1>{title}</h1>
    </div>
  );
}
