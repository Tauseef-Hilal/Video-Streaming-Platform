export function areOnSameSideOfReference(
  value1: number,
  value2: number,
  referencePoint: number
) {
  return (
    (value1 < referencePoint && value2 < referencePoint) ||
    (value1 >= referencePoint && value2 >= referencePoint)
  );
}
