import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main style={{ padding: "2rem" }}>
        <h1>Contact Us</h1>
        <p>You can reach us at:</p>

        <ul>
          <li>Email: example@example.com</li>
          <li>Phone: (555) 123-4567</li>
        </ul>

        <nav style={{ marginTop: "2rem" }}>
          <Link href="/">Home</Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
