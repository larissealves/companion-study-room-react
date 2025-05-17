import '../styles/creditos.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Credits() {
  return (
    <div className="pagina-creditos">
      <div className="conteudo-creditos">
        <h1 className="titulo-creditos">Credits & Inspiration</h1>
        <p className="subtitulo-creditos">Project by Larisse Alves • Inspired by Wandee Goodday</p>

        <p className="descricao-projeto">
          This is a minimalist and ad-free Pomodoro timer designed for anyone seeking focus without distractions.
          You don’t need to create an account, sign in, or make any payments — just open, start studying, and stay present.
          Built with care, cozy visuals, and inspired by the aesthetic of <strong>Wandee Goodday</strong>, this space is for your peaceful productivity.
        </p>

        <div className="tag-dev">⚠️ This project is currently in development.</div>

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
            <li><strong>Puppeteer</strong> — Web scraping with headless browser</li>
            <li><strong>Node.js</strong> — Backend runtime environment</li>
            <li><strong>Express</strong> — Web server for APIs</li>
            <li><strong>CSS3</strong> — Custom styling (neon theme)</li>
            <li><strong>React Router</strong> — Routing and page navigation</li>
          </ul>
        </section>

        <section className="sessao">
          <h2>🎬 Inspired by: Wandee Goodday</h2>
          <p>
            This project was inspired by the aesthetics and vibe of the Thai series
            <strong> Wandee Goodday</strong>.
          </p>
          <ul>
            <li>
              Production: <a href="https://www.instagram.com/gmmtv/" className="link-neon" target="_blank" rel="noreferrer">@gmmtv</a>
            </li>
            <li>
              Great Sapol: <a href="https://www.instagram.com/grtsp/" className="link-neon" target="_blank" rel="noreferrer">@grtsp</a>
            </li>
            <li>
              Inn Sarin: <a href="https://www.instagram.com/inpitar/" className="link-neon" target="_blank" rel="noreferrer">@inpitar</a>
            </li>
          </ul>
        </section>

        <section className="sessao">
          <h2>📋 To-do & Goals</h2>
          <ul>
            <li>🎨 Finalize UI/UX styling across all screens</li>
            <li>🌐 Translate content for full bilingual support (PT ↔ EN)</li>
            <li>⚙️ Complete Pomodoro logic & transitions</li>
            <li>🧘‍♀️ Ensure simple experience: no login, ads or payments</li>
            <li>♿ Add accessibility for better usability</li>
            <li>📱 Make it fully responsive (mobile/tablet/desktop)</li>
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
            <li>💌 PayPal: <strong>alves.larisser@gmail.com</strong></li>
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
