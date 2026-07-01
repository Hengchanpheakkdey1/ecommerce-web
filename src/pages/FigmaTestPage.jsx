// Generated from Figma "Rean-Design / Course Egghead" via REST API
// Exact colors, spacing, typography, shadows from design data

const C = {
  dark: "#252b42",
  blue: "#23a6f0",
  red: "#e64040",
  gray: "#727272",
  lightBg: "#f9f9f9",
  iconRed: "#ffdcd1",
  iconGreen: "#b8e9a7",
  green: "#2cc070",
  star: "#f3cc02",
}

const font = (size, weight = 400, color = C.dark) => ({
  fontFamily: "Montserrat, sans-serif",
  fontSize: size,
  fontWeight: weight,
  color,
})

function ArrowRight() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <path d="M1 5H11M7 1L11 5L7 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight({ color = C.blue }) {
  return (
    <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
      <path d="M1 1L8 8L1 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StarFilled() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill={C.star}>
      <path d="M9 1L11.163 6.361L17 6.9L12.819 10.539L14.123 16.25L9 13.25L3.877 16.25L5.181 10.539L1 6.9L6.837 6.361L9 1Z" />
    </svg>
  )
}

function StarEmpty() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={C.star} strokeWidth="1.5">
      <path d="M9 1L11.163 6.361L17 6.9L12.819 10.539L14.123 16.25L9 13.25L3.877 16.25L5.181 10.539L1 6.9L6.837 6.361L9 1Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={C.blue}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill={C.blue} />
    </svg>
  )
}

function TwitterIcon() {
  return (
    <svg width="24" height="20" viewBox="0 0 24 20" fill={C.blue}>
      <path d="M23 1a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 2s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 1z" />
    </svg>
  )
}

function Navbar() {
  return (
    <nav className="flex items-center justify-between" style={{ padding: "0 59px", height: 91 }}>
      <span style={font(24, 700, "white")}>BrandName</span>

      <div style={{ display: "flex", alignItems: "center", gap: 21 }}>
        {["Home", "Product", "Pricing", "Contact"].map((item) => (
          <a key={item} href="#" style={font(14, 700, "white")} className="hover:opacity-70">
            {item}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 45 }}>
        <a href="#" style={font(14, 700, "white")} className="hover:opacity-70">
          Login
        </a>
        <button
          style={{
            backgroundColor: C.blue,
            color: "white",
            ...font(14, 700, "white"),
            padding: "15px 25px",
            borderRadius: 5,
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 15,
            cursor: "pointer",
          }}
        >
          JOIN US
          <ArrowRight />
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section style={{ backgroundColor: C.dark }}>
      <Navbar />

      {/* Hero content */}
      <div
        style={{
          maxWidth: 1046,
          margin: "0 auto",
          paddingTop: 80,
          paddingBottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            paddingTop: 40,
            paddingBottom: 40,
            maxWidth: 701,
            width: "100%",
          }}
        >
          <p style={font(16, 700, C.blue)}>Welcome</p>
          <h1
            style={{
              ...font(58, 700, "white"),
              textAlign: "center",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Selling on the internet like a pro
          </h1>
          <p
            style={{
              ...font(20, 400, "white"),
              textAlign: "center",
              opacity: 0.9,
              margin: 0,
              maxWidth: 530,
            }}
          >
            We know how large objects will act, but things on a small scale just do not act that way.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                backgroundColor: C.blue,
                ...font(14, 700, "white"),
                padding: "15px 40px",
                borderRadius: 5,
                border: "none",
                cursor: "pointer",
              }}
            >
              Get Quote Now
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                ...font(14, 700, C.blue),
                padding: "15px 40px",
                borderRadius: 5,
                border: `1px solid ${C.blue}`,
                cursor: "pointer",
              }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div style={{ display: "flex", gap: 30, width: "100%" }}>
          {[
            {
              iconBg: C.iconRed,
              iconColor: C.red,
              title: "training Courses",
              dividerColor: C.red,
              cardBg: "white",
              textColor: C.dark,
              descColor: C.gray,
            },
            {
              iconBg: C.iconGreen,
              iconColor: C.green,
              title: "2,769 online courses",
              dividerColor: C.red,
              cardBg: "white",
              textColor: C.dark,
              descColor: C.gray,
            },
            {
              iconBg: "white",
              iconColor: C.blue,
              title: "training Courses",
              dividerColor: "white",
              cardBg: C.blue,
              textColor: "white",
              descColor: "white",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                backgroundColor: card.cardBg,
                borderRadius: 5,
                padding: "35px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                flex: 1,
                boxShadow: "0px 13px 19px rgba(0,0,0,0.07)",
              }}
            >
              <div
                style={{
                  width: 70,
                  height: 76,
                  backgroundColor: card.iconBg,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="27" height="27" viewBox="0 0 27 27" fill={card.iconColor}>
                  <rect width="27" height="27" rx="4" />
                </svg>
              </div>
              <p style={{ ...font(16, 700, card.textColor), margin: 0 }}>{card.title}</p>
              <div style={{ width: 50, height: 2, backgroundColor: card.dividerColor }} />
              <p style={{ ...font(14, 400, card.descColor), margin: 0, lineHeight: 1.6 }}>
                The gradual accumulation of information about atomic and small-scale behaviour...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PackagesSection() {
  return (
    <section
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 715,
        padding: "60px 0",
      }}
    >
      <div style={{ maxWidth: 1050, width: "100%", padding: "0 40px", display: "flex", alignItems: "center", gap: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 35, maxWidth: 507 }}>
          <div style={{ width: 94, height: 7, backgroundColor: C.red }} />
          <h2 style={{ ...font(40, 700, C.dark), margin: 0, lineHeight: 1.3 }}>
            Packages that are aprodable
          </h2>
          <p style={{ ...font(14, 400, C.gray), margin: 0, lineHeight: 1.7 }}>
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              ...font(14, 700, C.blue),
              textDecoration: "none",
            }}
          >
            Learn More
            <ChevronRight />
          </a>
        </div>

        {/* Image placeholder */}
        <div
          style={{
            width: 521,
            height: 381,
            backgroundColor: "#e8f4f8",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={font(14, 400, C.gray)}>Design Image</span>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const card = {
    quote: "Slate helps you see how many more days you need to work to reach your financial goal for the month and year.",
    name: "Regina Miles",
    role: "Designer",
  }

  return (
    <section style={{ backgroundColor: C.lightBg, padding: "160px 0" }}>
      <div
        style={{
          maxWidth: 1050,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          flexDirection: "column",
          gap: 96,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 691 }}>
          <p style={font(14, 700, C.blue)}>Practice Advice</p>
          <h2 style={{ ...font(40, 700, C.dark), margin: 0 }}>Our Experts Teacher</h2>
          <p style={{ ...font(14, 400, C.gray), margin: 0, lineHeight: 1.7 }}>
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div style={{ display: "flex", gap: 30 }}>
          {[card, card].map((t, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                padding: "25px 25px 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: "50%",
                  backgroundColor: "#d4e5f0",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="60" height="60" viewBox="0 0 60 60" fill={C.gray}>
                  <circle cx="30" cy="22" r="12" />
                  <path d="M6 56c0-13.255 10.745-24 24-24s24 10.745 24 24" />
                </svg>
              </div>

              {/* Card content */}
              <div
                style={{
                  padding: "30px 30px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 15,
                  width: "100%",
                }}
              >
                <p style={{ ...font(14, 400, C.gray), textAlign: "center", margin: 0, lineHeight: 1.7 }}>
                  {t.quote}
                </p>
                <div style={{ display: "flex", gap: 5 }}>
                  <StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarEmpty />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "0 25px" }}>
                  <p style={{ ...font(16, 700, C.dark), margin: 0 }}>{t.name}</p>
                  <p style={{ ...font(14, 700, C.gray), margin: 0 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedSection() {
  return (
    <section style={{ backgroundColor: "white", padding: "160px 0" }}>
      <div
        style={{
          maxWidth: 1050,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 80,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <p style={{ ...font(14, 700, C.blue), margin: 0 }}>Practice Advice</p>
          <h2 style={{ ...font(40, 700, C.dark), margin: 0, textAlign: "center" }}>Featured Products</h2>
          <p style={{ ...font(14, 400, C.gray), margin: 0, textAlign: "center", lineHeight: 1.7 }}>
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        {/* Subscribe input */}
        <div style={{ display: "flex", width: 688 }}>
          <input
            type="email"
            placeholder="Your Email"
            style={{
              flex: 1,
              height: 58,
              backgroundColor: "#f8f8f8",
              border: "1px solid #e6e6e6",
              borderRight: "none",
              borderRadius: "5px 0 0 5px",
              padding: "0 24px",
              ...font(14, 400, C.gray),
              outline: "none",
            }}
          />
          <button
            style={{
              width: 117,
              height: 58,
              backgroundColor: C.blue,
              border: "1px solid #e6e6e6",
              borderRadius: "0 5px 5px 0",
              ...font(14, 400, "white"),
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const columns = [
    {
      title: "Get In Touch",
      desc: "the quick fox jumps over the lazy dog",
      social: true,
    },
    {
      title: "Company info",
      links: ["About Us", "Carrier", "We are hiring", "Blog"],
    },
    {
      title: "Features",
      links: ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"],
    },
    {
      title: "Resources",
      links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
    },
  ]

  return (
    <footer>
      <div style={{ backgroundColor: C.dark, padding: "80px 0" }}>
        <div
          style={{
            maxWidth: 1050,
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            gap: 30,
          }}
        >
          {columns.map((col, i) => (
            <div
              key={i}
              style={{ display: "flex", flexDirection: "column", gap: i === 0 ? 25 : 20, flex: 1 }}
            >
              <h3 style={{ ...font(24, 700, "white"), margin: 0 }}>{col.title}</h3>
              {col.desc && (
                <p style={{ ...font(14, 400, "white"), margin: 0, lineHeight: 1.7 }}>{col.desc}</p>
              )}
              {col.social && (
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TwitterIcon />
                </div>
              )}
              {col.links && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      style={{ ...font(14, 700, "white"), textDecoration: "none" }}
                      className="hover:opacity-70"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: C.lightBg,
          padding: "25px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p style={{ ...font(14, 700, C.gray), margin: 0 }}>
          Made With Love By Figmaland All Right Reserved
        </p>
      </div>
    </footer>
  )
}

export default function FigmaTestPage() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", fontFamily: "Montserrat, sans-serif" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <Hero />
      <PackagesSection />
      <TestimonialsSection />
      <FeaturedSection />
      <Footer />
    </div>
  )
}
