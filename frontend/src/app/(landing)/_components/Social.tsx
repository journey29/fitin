import { Github, Linkedin, LucideIcon } from "lucide-react"

export const Social = () => {
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <SocialItem
        icon={Github}
        text="Github"
        href="https://github.com/journey29?tab=repositories"
      />
      <SocialItem
        icon={Linkedin}
        text="Linkedin"
        href="https://www.linkedin.com/in/andrii-smalyniuk-2b9b86210/"
      />
    </div>
  )
}

const SocialItem = ({
  icon: Icon,
  text,
  href
}: {
  icon: LucideIcon
  text: string
  href: string
}) => {
  return (
    <div className="group relative">
      <div className="from-darkPink to-darkPurple absolute -inset-0.5 rounded-md bg-gradient-to-r opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
      <button className="relative rounded-md bg-black/90 px-6 py-3.5">
        <a
          className="flex items-center space-x-2"
          href={href}
          target="_blank"
        >
          <Icon strokeWidth={1.2} />
          <span className="text-gray-100">{text}</span>
        </a>
      </button>
    </div>
  )
}
