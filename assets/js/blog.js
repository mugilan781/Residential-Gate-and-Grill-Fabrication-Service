/* ==========================================================================
   IRONHAUS — blog.js
   Single-page article renderer for blog-details.html
   Reads ?post=<slug> and swaps content, hero, author, nav and meta tags.
   ========================================================================== */
(() => {
  "use strict";

  const AUTHORS = {
    "Ravi Iyer": {
      img: "https://images.pexels.com/photos/12576220/pexels-photo-12576220.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Founder and master fabricator at IRONHAUS. Spends his days in the workshop and his evenings writing about why gates fail — so yours won't."
    },
    "Kavitha Nair": {
      img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Metallurgist and finish specialist at IRONHAUS. Runs the coating lab and keeps a rust log that would scare most fabricators into a different trade."
    },
    "Farhan Qureshi": {
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Automation engineer at IRONHAUS. Has installed more gate motors than he can count, and fixed even more that he didn't install."
    },
    "Suresh Gowda": {
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Workshop manager and head of the powder booth. Can tell a good coat from a bad one blindfolded — he says. We've never tested it."
    }
  };

  const POSTS = {
    "classical-vs-modern": {
      crumb: "Classical vs. Modern",
      heroTitle: "Classical vs. modern <span class=\"accent\">gates</span>",
      heroSub: "Which one will your house thank you for in 20 years? Our data says the answer surprises everyone.",
      category: "Design",
      date: "May 2026",
      readTime: "9 min read",
      author: "Ravi Iyer",
      title: "Which gate will your house thank you for in 20 years?",
      lead: "We've built 500 residential gates and renovated 40 more. That second number is the one that matters — renovating an old gate is the fastest way to learn what actually survives.",
      img: "assets/images/blog/classical-vs-modern.jpg",
      imgAlt: "Classical forged scrollwork gate alongside modern steel slat gate at a luxury driveway entrance",
      description: "Classical vs. modern gates — which one will your house thank you for in 20 years? A decade of driveway decisions, distilled into one honest article.",
      body: `
        <p>Every few months, a homeowner calls us about a gate that was "brand new" five years ago. The paint has blistered, the welds have gone brown at the joints, or the motor sounds like a blender. And every few months, we get the same question: <em>should we have gone classical or modern?</em></p>

        <p>The honest answer, after 500 installs and 40 renovations, is that the style is almost never the problem. The problem is the stuff you can't see in the brochure: the steel grade, the weld preparation, the finish system and the automation design. A boring classical gate built honestly will outlast a glamorous modern gate built cheaply, every single time.</p>

        <h2>What actually fails first</h2>
        <p>When an entrance ages badly, the failure almost never starts with the design. It starts at four specific points:</p>
        <ul>
          <li><strong>Capillary water traps:</strong> Horizontal slats without an internal weep hole hold standing water all monsoon. Rust begins from the inside out, where no brush can reach.</li>
          <li><strong>Undersized hinges:</strong> Modern cantilever slides need twice the bearing rating of a traditional swing gate. Fabricators size for the weight at rest, not the dynamic load in a windstorm.</li>
          <li><strong>Single-coat paint:</strong> Any gate painted on-site with enamel over mill scale will fail in 24 months in Bangalore's humidity. Powder coating over zinc phosphate gives 15+ years.</li>
          <li><strong>Motor torque mismatches:</strong> Automation motors bought off the shelf without a wind-load calculation run hot and burn out by season three.</li>
        </ul>

        <h2>The 20-year verdict</h2>
        <p>If you want an entrance that looks better at year twenty than it did on installation day, the rule is simple: choose the style that matches your architecture, but demand the fabrication discipline that survives the weather. A classical gate with generous negative space and hot-dip galvanising is timeless. A modern minimalist gate with precision mitered corners and baked fluoropolymer powder coating is equally timeless.</p>

        <div class="pull-quote">
          <blockquote>Style is a preference. Structural discipline is an engineering fact. Build for the monsoon, and the aesthetics will look after themselves.</blockquote>
          <cite>— Ravi Iyer, Master Fabricator, IRONHAUS</cite>
        </div>`
    },
    "seven-entrance-styles": {
      crumb: "Seven Entrance Styles",
      heroTitle: "Seven entrance styles that <span class=\"accent\">age well</span>",
      heroSub: "The patterns that still photograph well a decade later — judged on the driveway, not the brochure.",
      category: "Design",
      date: "Apr 2026",
      readTime: "6 min read",
      author: "Ravi Iyer",
      title: "Seven entrance styles that age better than the paint job",
      lead: "We keep a mental file of every gate we've built that still looks right ten years on. These are the seven entrance styles that keep showing up in it.",
      img: "assets/images/blog/seven-entrance-styles.jpg",
      imgAlt: "Contemporary luxury villa with horizontal steel slat sliding gate",
      description: "The gate patterns that still photograph well a decade later — from clean horizontals to quiet art-deco. Judged on the driveway, not the brochure.",
      body: `
        <p>Ten years is the honest horizon for a gate. The paint will have been redone at least once, the automation will be on its second motor, and the neighbourhood will have decided whether your entrance is a landmark or a liability. We keep a mental file of every gate that has passed that test — here is what keeps showing up in it.</p>

        <h2>The quiet moderns</h2>
        <p>Three of the seven are modern, and they share one trait: they're boring on purpose. Horizontal slat stacking in a dark finish reads calm at noon and disappears at night. A frameless cantilever slide makes a narrow entrance feel wider, because nothing frames the opening. And the flush-panel door with a single reveal gap — the line of light between panels — gives daylight something to do without any ornament at all.</p>

        <p>These work because they refuse to compete with the house. When the architecture is already loud, the gate's job is to stand aside and stay precise. The failures we see in modern entrances are never about the style; they're about slats that wave, gaps that drift and finishes that bubble. The style is fine. The execution is what ages.</p>

        <h2>The ornamented ones</h2>
        <p>The classical survivors split into two camps. The first is Regency scrollwork — but with modern spacing. The classic mistake is to pack the leaves so tight they read as a wall of metal. The version that survives is the one that breathes: wide scrolls, generous negative space, the steel reading as a line drawing against the street.</p>

        <p>The second camp is art-deco chevrons, the quietest of the ornamented styles. A chevron pattern at the base, doubling toward the top, gives an entrance an upward rhythm that photographs beautifully in long shadow. It reads as deliberate without ever shouting — which is why it survives taste changes that kill busier patterns.</p>

        <h2>The hybrids</h2>
        <p>The last two entries are the same gate, built twice. A modern frame — flat steel, honest welds, powder coat — carrying a single classical accent: one hand-rolled scroll at the hinge post, or a leaf edge that mirrors the house's arch. It's the entrance equivalent of a tailored suit with one bold tie. It photographs well, ages well and never picks a lane.</p>

        <div class="pull-quote">
          <blockquote>A gate ages the way a portrait does — the strong features hold, and the details either earn their keep or embarrass you.</blockquote>
          <cite>— Ravi Iyer, Founder, IRONHAUS</cite>
        </div>

        <p>If you read the list again, the shared rule is obvious: restraint, proportion and finish. Every style on it could be executed badly, and every style off it could be executed brilliantly. The pattern doesn't decide how a gate ages. The discipline does.</p>`
    },
    "corrosion-guide": {
      crumb: "The Honest Corrosion Guide",
      heroTitle: "Galvanised, painted or <span class=\"accent\">stainless</span>",
      heroSub: "What the brochures don't tell you about coastal air, monsoon walls and the real cost of rust.",
      category: "Materials",
      date: "Apr 2026",
      readTime: "7 min read",
      author: "Kavitha Nair",
      title: "Galvanised, painted or stainless: the honest corrosion guide",
      lead: "Every finish salesman has a favourite metal. We have thirty years of Bangalore monsoons instead — and the rust log to prove which one wins.",
      img: "assets/images/blog/corrosion-guide.jpg",
      imgAlt: "Workshop comparison of hot-dip galvanised steel, powder coated frame, and marine-grade stainless steel",
      description: "Galvanised, painted or stainless — what the brochures don't tell you about coastal air, monsoon walls and the real cost of rust. From the IRONHAUS coating lab.",
      body: `
        <p>Ask any metal salesman what to build a gate from and you'll get a confident answer, usually involving whatever they happen to sell. Ask us instead, and you'll get a question back: where does the gate live, and how long do you want it to survive? Because the honest answer is that every metal fails — the difference is where the failure starts.</p>

        <h2>Where rust actually begins</h2>
        <p>Corrosion never starts on the flat sheet. It starts at the weld, the cut edge and the drip line — the three places the brochure never photographs. A weld that wasn't ground flush holds water in a capillary seam. A laser-cut edge with no deburr has a razor-thin lip of uncoated steel. A horizontal rail with no slope holds a puddle all monsoon. Choose any finish you like; if these three details are wrong, it will fail.</p>

        <p>That's why our renovation log is so repetitive. Of the 40 gates we've rebuilt, 31 failed at the finish first — and in almost every case, the failure traced back to site-painted or un-phosphated steel, not to the metal itself.</p>

        <h2>Galvanised: honest, but not pretty</h2>
        <p>Hot-dip galvanising is the strongest sacrificial finish you can buy, and for coastal air it has no rival. Embedded posts, structural frames, anything underground or inside a boundary wall — we galvanise without thinking twice. But on a visible door panel it has two honest problems: zinc bloom darkens and patches over a few seasons, and galvanised steel cannot be powder coated without an etch-primer sandwich that most shops skip. If a brochure shows a pristine silver gate, ask what year the photo is from.</p>

        <h2>Painted: the honest version</h2>
        <p>Powder coating is only as good as the prep under it. The honest sequence is degrease, zinc-phosphate, dry, coat, cure — and the phosphate is where the corrosion resistance actually lives. It etches the surface so the coating grips at a molecular level, and it self-heals small scrapes by keeping them from spreading. Site-painted steel, by contrast, goes over mill scale and rust dust, and fails within a year or two. The thumb test in our coating article is the fastest way to tell the difference.</p>

        <h2>Stainless: the trap</h2>
        <p>Stainless is genuinely maintenance-free in the right place — which is interior and low-pollution settings. In coastal air you need the 316 grade, not the cheaper 304, because 304's extra nickel still isn't enough to hold off chloride pitting. And the trap that catches everyone: stainless hinges on a mild-steel frame. That's a galvanic couple, and it accelerates corrosion of the cheaper metal exactly where it matters — at the weld line nobody inspects.</p>

        <div class="pull-quote">
          <blockquote>Rust doesn't start on the flat sheet. It starts at the weld, the cut edge and the drip line — the places the brochure never photographs.</blockquote>
          <cite>— Kavitha Nair, Coating Lab, IRONHAUS</cite>
        </div>

        <p>The rule we actually build to: galvanise what's hidden, phosphated powder coat what's visible, and use 316 stainless only where salt air demands it and the budget allows. Everything else is marketing.</p>`
    },
    "gate-motor-fails": {
      crumb: "Why Your Gate Motor Fails",
      heroTitle: "Why your gate motor <span class=\"accent\">fails</span>",
      heroSub: "Ninety percent of motor failures are decided on the drawing board, not the driveway. Here's how we design them out.",
      category: "Automation",
      date: "Mar 2026",
      readTime: "8 min read",
      author: "Farhan Qureshi",
      title: "Why your gate motor fails (and how to design it out)",
      lead: "We service motors we never installed. After enough of them, you stop blaming the motor and start blaming the gate — because the gate decided the motor's fate months before it was fitted.",
      img: "assets/images/blog/gate-motor-fails.jpg",
      imgAlt: "Automated electric sliding gate motor operator installation with gear rack",
      description: "Ninety percent of gate motor failures are decided on the drawing board. The weight budget, the limit switches, the control box — here's how we design them out.",
      body: `
        <p>The most common call we get isn't for a new gate. It's for a motor that's stopped behaving — grinding, stopping mid-travel, or refusing to open on a humid morning. And after you've taken enough of those calls, you notice the pattern: the motor is rarely the villain. The gate it was bolted to made the failure inevitable.</p>

        <h2>The weight budget nobody makes</h2>
        <p>Every gate we build has a weight budget before the first bar is cut. Not an estimate — a line item: leaf weight, hinge friction, wind load on a solid panel, the extra pull of a slope. It exists because the single biggest cause of motor death in our renovation log is simple undersizing. Of the 40 gates we've rebuilt, 19 had motors that were too small for the actual leaf weight, usually because the gate was fabricated without ever being weighed.</p>

        <p>A motor that's undersized doesn't fail dramatically. It runs hot, it stalls at the worst moment — typically fully open, in the rain — and it burns out quietly over a few seasons. The gate still looks perfect. That's the cruel part.</p>

        <h2>What actually kills a motor</h2>
        <p>Ranking our service records, five causes cover almost everything:</p>
        <ul>
          <li>Undersized drive — the gate weighs more than the motor's rated pull, and the current draw tells the story.</li>
          <li>Limit switches doing the braking — no buffer before the end of travel, so the motor slams into stall current at every open and close.</li>
          <li>Missing safety loop — no obstruction detection, so the motor keeps pushing against a jammed leaf until something yields.</li>
          <li>Control box in the sun — electronics derate dramatically above 45°C, and a black box on a west-facing wall cooks all summer.</li>
          <li>Chain in the weather — chains stretch, lubricant washes out, and the drive ratio quietly changes until the motor strains.</li>
        </ul>

        <h2>Designing failure out</h2>
        <p>The rules we build to are boring, which is the point. Size the motor at 1.5× the calculated load, and document the calculation in the handover file. Fit limit switches with a mechanical buffer so the drive never stalls. Wire obstruction detection as standard — the cost is a reel of cable, the benefit is a motor that never pushes into a jam. Mount control boxes in shade with breathing space, never inside a steel box that acts as a solar oven. And for the drive: rack and pinion on sliding leaves, rated chain with a tensioner on everything else.</p>

        <div class="pull-quote">
          <blockquote>A motor doesn't die on the driveway. It dies on the drawing board, months earlier.</blockquote>
          <cite>— Farhan Qureshi, Automation, IRONHAUS</cite>
        </div>

        <p>None of this is exotic engineering. It's just doing the arithmetic before the fabrication starts, instead of discovering it on the service call. The next time someone quotes you a motor by price, ask them for the weight calculation. Watch what happens.</p>`
    },
    "powder-coating": {
      crumb: "Powder Coating, Explained",
      heroTitle: "Powder coating, <span class=\"accent\">explained</span>",
      heroSub: "Why we zinc-phosphate, what the oven does, and how to tell a good coat from a bad one with your thumb.",
      category: "Materials",
      date: "Mar 2026",
      readTime: "5 min read",
      author: "Suresh Gowda",
      title: "Powder coating, explained by the people who own the booth",
      lead: "I run the booth. Ask me about powder coating and you'll get the version nobody puts in the brochure — starting with what it can't fix.",
      img: "assets/images/blog/powder-coating.jpg",
      imgAlt: "Fabricator applying electrostatic powder coating to a welded steel gate frame in spray booth",
      description: "What powder coating actually is, why the prep matters more than the paint, and how to test a coat with your thumbnail — from the man who runs the booth.",
      body: `
        <p>Powder coating sounds like a miracle: dry paint, no solvents, baked on, tougher than anything liquid. It is tougher — when it's done right. But the booth sees what the brochure doesn't: the chemistry that happens before the powder ever touches the metal, and the mistakes that no oven can fix.</p>

        <h2>What the oven is actually for</h2>
        <p>Powder coating is finely ground plastic that's sprayed on electrostatically, then melted into a continuous skin in an oven. The electrostatic charge is what gets the powder into corners a spray gun couldn't reach. The oven is what fuses it — and here's the honest part: the oven cures the powder, but it can't fix a bad surface. It will faithfully preserve every flaw underneath it.</p>

        <p>The sequence we run is degrease, zinc-phosphate, dry, coat, cure. The phosphate step is where the corrosion resistance lives. It etches the steel into a microscopically rough, chemically bonded layer that the powder grips molecularly — and it passivates the surface so that if the coat gets scratched, the rust can't run sideways under it. Skip the phosphate and you have coloured plastic glued to bare steel. It will look identical for a year. Then it will flake in sheets.</p>

        <h2>The thumb test</h2>
        <p>You can check a coat in ten seconds, no instruments. Press your thumbnail into the edge of a panel — not the face, the edge. A good coat flexes under pressure and springs back. A bad one cracks, chips or reveals bare steel. Then run your hand along any sharp corner: edges starve coverage because powder and paint both pull away from sharp radii. If the edge gleams bare under light, the corner is already corroding, and that gate is going to bloom within two seasons.</p>

        <h2>Thickness myths</h2>
        <p>Thicker is not better. The spec window is 60–80 microns; beyond that the coating gets brittle and chips rather than flexing. We read every batch with a gauge before it leaves the rack. And two things ruin any coat regardless of thickness: contamination between the phosphate bath and the oven — dust, oil, fingerprints, all of which bake themselves in permanently — and curing at the wrong temperature curve, which leaves a coat that looks perfect and fails the thumbnail test.</p>

        <div class="pull-quote">
          <blockquote>If a coating needs a brochure to explain it, it's probably hiding something. The booth doesn't have that luxury.</blockquote>
          <cite>— Suresh Gowda, Workshop Manager, IRONHAUS</cite>
        </div>

        <p>So when you're comparing quotes, don't ask what colour it will be. Ask what happens to the steel before the powder touches it. The answer — phosphate or not, edges deburred or not — is the entire story.</p>`
    }
  };

  const ORDER = [
    { slug: "classical-vs-modern", title: "Classical vs. modern gates — which ages better?" },
    { slug: "seven-entrance-styles", title: "Seven entrance styles that age better than the paint job" },
    { slug: "corrosion-guide", title: "Galvanised, painted or stainless: the honest corrosion guide" },
    { slug: "gate-motor-fails", title: "Why your gate motor fails (and how to design it out)" },
    { slug: "powder-coating", title: "Powder coating, explained by the people who own the booth" }
  ];

  const slug = new URLSearchParams(window.location.search).get("post");
  const post = slug && POSTS[slug];
  if (!post) return;

  const $ = (sel) => document.querySelector(sel);

  $("[data-post-crumb]").textContent = post.crumb;
  $("[data-post-hero-title]").innerHTML = post.heroTitle;
  $("[data-post-hero-sub]").textContent = post.heroSub;

  $("[data-post-meta]").innerHTML =
    `<span>${post.category}</span><span class="dot"></span><span>${post.date}</span>` +
    `<span class="dot"></span><span>${post.readTime}</span><span class="dot"></span><span>By ${post.author}</span>`;
  $("[data-post-title]").textContent = post.title;
  $("[data-post-lead]").textContent = post.lead;

  const heroImg = $("[data-post-img]");
  heroImg.src = post.img;
  heroImg.alt = post.imgAlt;

  $("[data-post-body]").innerHTML = post.body;

  const author = AUTHORS[post.author];
  $("[data-post-author-img]").src = author.img;
  $("[data-post-author-img]").alt = "Portrait of " + post.author;
  $("[data-post-author-name]").textContent = post.author;
  $("[data-post-author-bio]").textContent = author.bio;

  const idx = ORDER.findIndex((p) => p.slug === slug);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];
  const prevLink = $("[data-post-prev]");
  const nextLink = $("[data-post-next]");
  prevLink.href = "blog-details.html?post=" + prev.slug;
  nextLink.href = "blog-details.html?post=" + next.slug;
  prevLink.querySelector("strong").textContent = prev.title;
  nextLink.querySelector("strong").textContent = next.title;

  document.title = post.title + " | IRONHAUS Blog";
  document.querySelector('meta[name="description"]').setAttribute("content", post.description);
  document.querySelector('meta[property="og:title"]').setAttribute("content", post.title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", post.description);
  document.querySelector('meta[property="og:image"]').setAttribute("content", post.img);
  document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
})();