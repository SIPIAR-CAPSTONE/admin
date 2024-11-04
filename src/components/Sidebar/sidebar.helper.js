export function getNameInitial(name) {
  if (!name) return "?";

  const nameParts = name.toUpperCase().split(" ");

  if (nameParts.length === 1) {
    return nameParts[0][0];
  } else {
    const firstInitial = nameParts[0][0];
    const lastInitial = nameParts[nameParts.length - 1][0];
    return `${firstInitial}${lastInitial}`;
  }
}
