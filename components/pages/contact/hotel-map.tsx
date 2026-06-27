export const HotelMap = () => {
  return (
    <section className="pb-20">
      <div className="max-w-content-area w-[90%] mx-auto">
        <div className="overflow-hidden border border-border h-[500px]">
          <iframe
            src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};
