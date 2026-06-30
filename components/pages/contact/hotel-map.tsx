export const HotelMap = () => {
  return (
    <section className="pb-20">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="overflow-hidden border border-border h-125">
          <iframe
            src="https://www.google.com/maps?q=Hotel+Blu+Plaza,+Sector+89,+Gurugram,+Haryana&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
