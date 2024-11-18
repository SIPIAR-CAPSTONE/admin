export default function ResendCountdown({ time }) {
  if (time === 0) {
    return (
      <p className="text-[0.8rem] mt-1 text-center text-green-500 dark:text-green-500">
        Resent, please wait a while.
      </p>
    );
  }

  return (
    <div className="mt-1 text-center">
      <p className="text-[0.8rem] text-red-500 dark:text-red-500">
        Resend Token in <span className="text-sm font-semibold">{time}</span>{" "}
        sec
      </p>
    </div>
  );
}
