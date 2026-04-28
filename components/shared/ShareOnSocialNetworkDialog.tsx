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
  const [url, setUrl] = useState('');

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setUrl(
        customUrl ? window.location.origin + customUrl : window.location.href
      );
    }
  };

  return (
    <Dialog.Root onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <Button
          size="large"
          className={cn(
            `flex-center bg-white-100 shadow-card hover:bg-white-400/30 dark:bg-black-800 hover:dark:bg-black-700 cursor-pointer gap-2 rounded py-2 transition-colors px-2 ${btnStyles}`
          )}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {btnText}
          <ShareIcon className="text-black-700 dark:text-white-300" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="bg-white-100 shadow-card dark:bg-black-900 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 fixed top-1/2 left-1/2 z-50 flex max-h-[85vh] w-88.5 -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-[10px] px-3.5 py-7.5 focus:outline-none md:gap-7.5 md:px-10 md:py-9 lg:w-130 lg:rounded-2xl">
          <VisuallyHidden.Root>
            <Dialog.Title></Dialog.Title>
          </VisuallyHidden.Root>
          <div className="flex-between">
            <h1 className="h1-medium">Share with</h1>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close share dialog"
                className="cursor-pointer"
              >
                <CloseIcon className="text-black-800 dark:text-white-200" />
              </button>
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
