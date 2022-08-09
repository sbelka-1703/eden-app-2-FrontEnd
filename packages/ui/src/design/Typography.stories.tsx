// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Design-System/Typography",
};

export const Typography = () => {
  return (
    <div>
      <div className={`text-soilHeading1 font-poppins font-medium`}>
        soilHeading1
        <p>The brown fox jumped over the lazy dog.</p>
      </div>
      <div className={`text-soilHeading2 font-poppins font-medium`}>
        soilHeading2
        <p>The brown fox jumped over the lazy dog.</p>
      </div>
      <div className={`text-soilHeading3 font-poppins font-medium`}>
        soilHeading3
        <p>The brown fox jumped over the lazy dog.</p>
      </div>
      <div className={`text-soilBody font-Inter `}>
        soilBody
        <p>The brown fox jumped over the lazy dog.</p>
      </div>
      <div className={`text-soilLabel font-Inter font-semibold uppercase`}>
        soilLabel
        <p>The brown fox jumped over the lazy dog.</p>
      </div>
    </div>
  );
};
