import Link from "next/link";

const AdditionalLinks: React.FC = () => {
  return (
    <>
      {/* Could be organised into an array */}
      <p>
        <Link href="/about">About </Link>
        <Link href="/press">Press </Link>
        <Link href="/copyright">Copyright </Link>
        <br />
        <Link href="/contact">Contact Us </Link>
        <Link href="/creators">Creators </Link>
        <br />
        <Link href="/advertise">Advertise </Link>
        <Link href="/developers">Developers</Link>
      </p>
      <p>
        <Link href="/terms">Terms </Link>
        <Link href="/privacy">Privacy </Link>
        <Link href="/safety">Policy & Safety </Link>
        <br />
        <Link href="/how_fusionflix_works">How FusionFlix Works </Link>
        <br />
        <Link href="/test_new_features">Test New Features </Link>
      </p>
    </>
  );
};

export default AdditionalLinks;
