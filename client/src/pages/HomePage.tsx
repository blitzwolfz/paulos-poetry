import "./styles/homePage.scss";

export default function HomePage() {
  return (
    <div className="home-page-wrapper">
      <div className="home-page">
        <h1>CanCyp Publications</h1>
        <h1>Paulos Leoudiou Ioannou</h1>

        <div className="link-wrapper">
          <a href="/poetry">Poetry</a>
          <a href="/translations">Translations</a>
        </div>
      </div>
    </div>
  );
}
