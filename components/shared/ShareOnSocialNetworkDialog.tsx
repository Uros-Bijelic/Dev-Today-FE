'use client';

import { Button } from '../ui/button';

import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from 'radix-ui';
import { useState } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import ShareIcon from '@/components/icons/Share';
import CloseIcon from '@/components/icons/CloseIcon';
import { cn } from '@/lib/utils';
interface IShareOnSocialNetworkDialogProps {
  btnText?: React.ReactNode;
  customUrl?: string;
  btnStyles?: string;
}

const ShareOnSocialNetworkDialog: React.FC<
  IShareOnSocialNetworkDialogProps
> = ({ btnText, customUrl, btnStyles }) => {
  const [isOpen, setIsOpen] = useState(false);

  const url =
    typeof window !== 'undefined'
      ? customUrl
        ? window.location.origin + customUrl
        : window.location.href
      : '';

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button
          size="large"
          className={cn(`flex-center bg-white-100 shadow-card hover:bg-white-400/30 dark:bg-black-800 hover:dark:bg-black-700 cursor-pointer gap-2 
              rounded py-2 transition-colors px-2 ${btnStyles}`)}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.preventDefault();
          }}
        >
          {btnText}
          <ShareIcon className="text-black-700 dark:text-white-300" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 backdrop-blur-md" />
        <Dialog.Content
          className="bg-white-100 shadow-card data-[state=open]:animate-contentShow dark:bg-black-900 fixed top-1/2 left-1/2 flex max-h-[85vh] w-[354px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-[10px] px-3.5 py-[30px] focus:outline-none md:gap-[30px] md:px-10 md:py-9 lg:w-[520px] lg:rounded-2xl"
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.preventDefault();
          }}
        >
          <VisuallyHidden.Root>
            <Dialog.Title></Dialog.Title>
          </VisuallyHidden.Root>
          <div className="flex-between">
            <h1 className="h1-medium">Share with</h1>
            <Dialog.Close asChild>
              <CloseIcon className="text-black-800 dark:text-white-200 cursor-pointer" />
            </Dialog.Close>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <LinkedinShareButton
              title="Share on Linkedin"
              htmlTitle="Share on Linkedin"
              url={url}
              aria-label="Share by Linkedin"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <FacebookShareButton
              title="Share on Facebook"
              htmlTitle="Share on Facebook"
              url={url}
              aria-label="Share by Facebook"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
          <div className="flex items-center justify-center gap-5">
            <TelegramShareButton
              title="Share on Telegram"
              htmlTitle="Share on Telegram"
              url={url}
              aria-label="Share by Telegram"
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <WhatsappShareButton
              title="Share on Whatsapp"
              htmlTitle="Share on Whatsapp"
              url={url}
              aria-label="Share by Whatsapp"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ShareOnSocialNetworkDialog;
