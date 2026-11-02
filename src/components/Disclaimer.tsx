import "../css/disclaimer.css";

const Disclaimer = () => {
  return (
    <section className="disclaimer-section" id="disclaimer">
      <div className="section-wrap">
        <div className="sec-head">
          <h2>Disclaimer</h2>
          <p>Please read this before using the website.</p>
        </div>
        <div className="disc-callout">
      <svg className="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z M9.2 12.2l2.3 2.3 3.8-4.4"/></svg>
      <p><strong>In short:</strong> this website is an independent fan project. It is independently owned and operated, and it is not affiliated with, endorsed by, or in collaboration with Rockstar Games or the Grand Theft Auto VI (Unofficial) Discord server.</p>
    </div>

    <div className="disc-body">
      <article className="disc-sec">
        <span className="disc-num">01</span>
        <div>
          <h3>Independent ownership and operation</h3>
          <p>This website is independently owned and operated by an individual fan. It was created for enjoyment and for the community, and it is not run by, or on behalf of, any game publisher, developer or community server.</p>
          <p>It is not affiliated with, endorsed by, or in collaboration with either of the following:</p>
          <ul className="disc-list">
            <li><b>Rockstar Games</b><span>The studio behind the Grand Theft Auto series. No relationship, partnership or sponsorship exists between this website and Rockstar Games.</span></li>
            <li><b>Grand Theft Auto VI (Unofficial Discord Server)</b><span>A fan-run community server. No relationship, partnership or sponsorship exists between this website and that server or its moderators, and a link to it does not imply otherwise.</span></li>
          </ul>
        </div>
      </article>

      <article className="disc-sec">
        <span className="disc-num">02</span>
        <div>
          <h3>Accuracy of information</h3>
          <p>The dates, times, milestones and descriptions on this website are compiled from publicly available sources, including official announcements and news reports. They are provided for general information only and are not official statements from Rockstar Games.</p>
          <p>Release details can change, and unlock times shown here are based on reported regional store listings. Please confirm all dates, times and pre-order details through Rockstar Games and your platform’s official store before making any decisions or purchases.</p>
        </div>
      </article>

      <article className="disc-sec">
        <span className="disc-num">03</span>
        <div>
          <h3>Trademarks and copyrighted material</h3>
          <p>Grand Theft Auto, GTA, the Grand Theft Auto VI logo, and related names, artwork, screenshots and trailers are trademarks or copyrighted works of their respective owners, including Rockstar Games and Take-Two Interactive Software, Inc. PlayStation, Xbox, Discord, YouTube and Netflix are trademarks of their respective owners.</p>
          <p>These materials appear here for informational and fan purposes only. This website does not claim ownership of them and does not charge for access to them.</p>
        </div>
      </article>

      <article className="disc-sec">
        <span className="disc-num">04</span>
        <div>
          <h3>Third-party links and communities</h3>
          <p>This website links to external services, including video platforms, online stores and Discord servers. Those sites and communities are operated by other parties. This website does not control their content, moderation or policies, and is not responsible for them.</p>
          <p>Joining any community or using any external service is done at your own discretion and is subject to that service’s own terms and rules.</p>
        </div>
      </article>

      <article className="disc-sec">
        <span className="disc-num">05</span>
        <div>
          <h3>Contact and removal requests</h3>
          <p>If you are a rights holder and would like any material removed or corrected, or if you notice an error on this website, please get in touch through the project’s <a href="https://github.com/heisenbergx98/GTA-VI-Countdown" target="_blank" rel="noopener noreferrer">GitHub repository</a>. Requests will be reviewed and handled promptly.</p>
        </div>
      </article>

      <article className="disc-sec">
        <span className="disc-num">06</span>
        <div>
          <h3>Changes to this disclaimer</h3>
          <p>This disclaimer may be updated from time to time. The website is provided “as is”, without warranties of any kind, and its owner is not liable for any loss arising from its use.</p>
          <p className="disc-updated">Last updated: 2 November 2026</p>
        </div>
      </article>
    </div>
      </div>
    </section>
  );
};

export default Disclaimer;
