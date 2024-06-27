import React from "react";
import "./TextComponent.css"; // تستطيع إنشاء ملف CSS لتنسيق العناصر إذا لزم الأمر
import heroImage from "./landing-group.webp"; // استيراد الصورة

const TextComponent = () => {
  return (
    <div className="container">
      <img src={heroImage} alt="Hero" className="image" /> {}
      <div className="text-container">
        <p>
          <span className="highlight">مارس</span>، هي المنصة الإحترافية التي تضمن
          لك بداية مثالية في عالم التدريب الصيفي! هنا، يجتمع الطلاب
          الطموحون الذين يتطلعون لتحقيق أحلامهم مع الشركات الرائدة التي
          تفتح أبوابها لتقديم فرص تدريبية مثمرة. نحن هنا لنمنحك تجربة عملية
          لا تُنسى، تمتلئ بالتحديات والفرص لتطوير مهاراتك وتحقيق أهدافك
          المهنية. مع مارس، لن تكون مجرد طالب، بل ستكون جزءًا من مجتمع
          يعمل بتلاحم لبناء مستقبل واعد ومشرق. هيا، انطلق معنا نحو عالم
          التعلم والنجاح!
        </p>
      </div>
    </div>
  );
};

export default TextComponent;
