import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailShareButton,
  FacebookShareButton,
  TelegramIcon,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export const Share = () => {
  const currentUrl = window.location.href;

  console.log(window.location);
  return (
    <div className="flex space-x-2 ">
      <EmailShareButton
        url={currentUrl}
        subject="wahou"
        body="corps"
        children={<EmailIcon round size="30" />}
      />
      <WhatsappShareButton
        url={currentUrl}
        children={<WhatsappIcon round size="30" />}
        title="Rejoignez moi sur cet évenement pour aider l'Ukraine !"
      />
      <FacebookShareButton
        url={currentUrl}
        children={<FacebookIcon round size="30" />}
      />
      <TwitterShareButton
        url={currentUrl}
        children={<TwitterIcon round size="30" />}
        title="Rejoignez moi sur cet évenement pour aider l'Ukraine !"
        via={currentUrl}
        related={["@caravane"]}
      />
      <LinkedinShareButton
        url={currentUrl}
        children={<LinkedinIcon round size="30" />}
      />
      <TelegramShareButton
        url={currentUrl}
        children={<TelegramIcon round size="30" />}
      />
    </div>
  );
};
