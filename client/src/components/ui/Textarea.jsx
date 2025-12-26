export default function Textarea({
  rows = 4,
  className = "",
  ...props
}) {
  return (
    <textarea
      rows={rows}
      className={`
        w-full resize-none
      
        border-b border-gray-300
        px-1 py-2
        text-sm leading-relaxed
        text-gray-900
        placeholder:text-gray-400
        focus:border-black focus:outline-none

        dark:border-gray-700
        dark:text-gray-900
        dark:placeholder:text-gray-500
        dark:focus:border-gray-100

        transition-colors
        ${className}
      `}
      {...props}
    />
  );
}
