export const formatCaption = (caption: string) => {
  // Remove the "Caption: " prefix.
  const formattedCaption = caption.replace("Caption: ", "");

  // Capitalize the first letter of the caption.
  const firstCharUpper = formattedCaption.charAt(0).toUpperCase();

  // Slice the rest of the caption.
  const restOfFormattedCaption = formattedCaption.slice(1);

  return firstCharUpper + restOfFormattedCaption;
};
