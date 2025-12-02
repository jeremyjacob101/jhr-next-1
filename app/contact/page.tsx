import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-3xl mx-auto px-5 pt-10 pb-16 font-sans">
        <h1 className="text-[30px] font-semibold mb-2">Contact Us</h1>

        <p className="text-[15px] text-gray-600 mb-7">
          Interested in one of our Jerusalem properties or looking for something
          specific? Leave your details and a broker will reach out.
        </p>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 rounded-2xl p-5 shadow-md text-sm">
            <h2 className="text-[19px] font-semibold mb-2">
              Jerusalem Heritage Realty Office
            </h2>
            <p>18 King George Street, Jerusalem, Israel</p>
            <p>+972-2-555-1212</p>
            <p>office@JerusalemHeritageRealty.com</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 shadow-md text-sm">
            <h2 className="text-[19px] font-semibold mb-2">
              Contact Form (Coming Soon)
            </h2>
            <p className="text-[14px] text-gray-500">
              This will be replaced with a working form that sends enquiries
              directly to the brokerage CRM or email.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
