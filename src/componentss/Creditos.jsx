import '../styles/creditos.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Credits() {
  return (
    <div className="pagina-creditos">
      <div className="conteudo-creditos">
        <h1 className="titulo-creditos">Credits & Inspiration</h1>
        <p className="subtitulo-creditos">Project by Larisse Alves </p>

        <p className="descricao-projeto">
          This is a minimalist and ad-free Pomodoro timer designed for anyone seeking focus without distractions.
          You don’t need to create an account, sign in, or make any payments — just open, start studying, and stay present.
        </p>

        <div className="tag-dev">🚫 This project is archived and will not receive further updates.
          <p> You can still enjoy it as it is. 💜</p>
        </div>

        <section className="sessao">
          <a
            className="link-neon"
            href="https://linktr.ee/larisseralves"
            target="_blank"
            rel="noopener noreferrer"
          >
            Larisse Alves – My Linktree
          </a>
        </section>

        <section className="sessao">
          <h2>🛠️ Technologies Used</h2>
          <ul className="tech-list">
            <li><strong>React</strong> — Front-end framework</li>
            <li><strong>Vite</strong> — Fast build tool</li>
            <li><strong>Node.js</strong> — Backend runtime environment</li>
            <li><strong>CSS3</strong> — Custom styling (neon theme)</li>
            <li><strong>React Router</strong> — Routing and page navigation</li>
          </ul>
        </section>

        
        

        <section className="sessao">
          <h2>🎧 Resources & Assets</h2>
          <ul>
            <li>
              Alarm sound from: <a href="https://pixabay.com/pt/music/search/alarm/?pagi=3" className="link-neon" target="_blank" rel="noreferrer">Pixabay Music</a>
            </li>
            <li>
              AI-generated visuals provided by <strong>ChatGPT</strong> image tools
            </li>
          </ul>
        </section>

        <section className="sessao">
          <h2>☕ Support the Developer</h2>
          <p>
            If this project helped you focus or brought a smile to your day,
            consider sending a coffee my way 💜.
          </p>
          <ul>
            <li>💌 PayPal and PIX: <strong>alves.larisser@gmail.com</strong></li>
            <li>🌍 Wise: <strong>larisser4</strong></li>
          </ul>
          <p>
            Any support is deeply appreciated and helps me keep building cozy tools like this one. ✨
          </p>
        </section>

        <section className="sessao">
          <Link to="/" className="link-neon">← Back to Home</Link>
        </section>

        <footer>
          <p>Made with 💜 for study and creative purposes.</p>
        </footer>
      </div>
    </div>
  );
}
