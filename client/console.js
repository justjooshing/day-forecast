const styleCopy =
  "font-weight: bold; color: white; background-color: #2c3e50; padding: 2px 4px; border-radius: 2px;";
const styleCardNumber = "color: #3498db; padding-left: 8px; font-size: 16px;";
const styleExpiration = "color: #e67e22; padding-left: 8px; font-size: 16px;";

console.log(
  " %cFor test purposes use%c\nCard number: 4242 4242 4242 4242%c\nExpiration: 12/34\n%cOther details can be any value.",
  styleCopy,
  styleCardNumber,
  styleExpiration,
  styleCopy,
);
