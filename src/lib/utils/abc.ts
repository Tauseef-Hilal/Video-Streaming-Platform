export function areOnSameSideOfReference(
  value1: number,
  value2: number,
  referencePoint: number
) {
  return (
    (value1 < referencePoint && value2 < referencePoint) ||
    (value1 > referencePoint && value2 > referencePoint) ||
    (value1 === referencePoint && value2 === referencePoint)
  );
}

export function getFormattedDifference(timestamp: string) {
  // Calculate diff in milliseconds
  const date = new Date(timestamp);
  const currentDate = new Date();

  let diff = currentDate.getTime() - date.getTime();

  // Formula to convert from prev unit to curr
  // T(curr) = T(prev) / F(curr)
  const conversionMap = {
    second: 1000,
    minute: 60,
    hour: 60,
    day: 24,
    week: 7,
    month: 4,
    year: 12,
  };

  let unit, factor, suffix;
  for ([unit, factor] of Object.entries(conversionMap)) {
    if (diff < factor) break;
    diff = Math.floor(diff / factor);
    suffix = unit;
  }

  return `${diff} ${suffix}${diff > 1 ? "s" : ""}`;
}

export function getFormattedViewCount(viewCountString: string): string {
  const viewCount = parseInt(viewCountString);

  if (viewCount < 1000) {
    return viewCount.toString();
  } else if (viewCount < 1_000_000) {
    return `${(viewCount / 1000).toFixed(1)}K`.replace(".0", "");
  } else {
    return `${(viewCount / 1_000_000).toFixed(1)}M`.replace(".0", "");
  }
}

export function getFormattedDuration(duration: string): string {
  // Regex to extract time from ISO 8601 format
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  if (!matches) {
    return "";
  }

  const hours = matches[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

  const formattedTime = [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .filter((value, index) => value !== "00" || index === 2)
    .join(":");

  return `${formattedTime.length == 2 ? "0:" : ""}${formattedTime}`;
}

export function resetBodyScroll() {
  document.body.style.overflow = "unset";
  document.body.classList.remove("scroll-border");
  document.getElementById("header")!.classList.remove("scroll-border");
}

export function disableBodyScroll() {
  document.body.style.overflow = "hidden";
  document.body.classList.add("scroll-border");
  document.getElementById("header")!.classList.add("scroll-border");
}
