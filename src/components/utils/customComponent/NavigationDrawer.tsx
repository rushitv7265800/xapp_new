import { FunctionComponent, PropsWithChildren, useRef } from 'preact/compat';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Block from './Block';
import Image from './Image';
import YoutubeLogo from "../assets/FrontpageIcons/YoutubeLogo.svg";
import YoutubeText from "../assets/FrontpageIcons/YoutubeText.svg";
import { HeroIcon } from './Icon';
import * as OriginalDrawer from '@accessible/drawer';
import LoginLogo from "../assets/drawer/LoginLogo.svg";
import { HTMLAttributes } from 'react';
import { useState } from 'preact/hooks';

type SingleNavItem = {
  title: string;
  href: string;
  outlined?: boolean;
  icon: FunctionComponent<HTMLAttributes<SVGSVGElement>>;
};

export type NavItems = SingleNavItem[];

type NavigationDrawerProps = {
  items: NavItems;
  children?: JSX.Element | null; // Explicitly type children
};

export default function NavigationDrawer({ children, items }: NavigationDrawerProps) {
  return (
    <OriginalDrawer.Drawer>
      <Wrapper>
        <OriginalDrawer.Target openClass="drawer-opened" closedClass="drawer-closed" placement="left">
          <div className="my-drawer backdrop-blur-sm">
            <div className="my-drawer-container bg-[#242424]">
              <DrawerCloseButton />
              <NavItemsList items={items} />
            </div>
          </div>
        </OriginalDrawer.Target>
      </Wrapper>
      {children} {/* Explicitly render children */}
    </OriginalDrawer.Drawer>
  );
}

function DrawerCloseButton() {
  const ref = useRef(null);
  const a11yProps = OriginalDrawer.useA11yCloseButton(ref);
  const { close } = OriginalDrawer.useDrawer();

  return (
    <Block className="w-full justify-between">
      <Block className="gap-2 flex items-center justify-center">
        <Image src={YoutubeLogo} classname="h-[100px] w-[50px] pl-5" />
        <Image src={YoutubeText} classname="h-[100px] w-[60px]" />
      </Block>
      <HeroIcon iconName="XMarkIcon" className="h-8 w-8 text-white" {...a11yProps} onClick={close} />
    </Block>
  );
}

function NavItemsList({ items }: NavigationDrawerProps) {
  const storedData = localStorage.getItem("USER_LOGIN");
  const storedUser = storedData ? JSON.parse(storedData) : null;
  const [loginText, setLoginText] = useState("Logout");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (storedUser && confirmLogout) {
      localStorage.removeItem("USER_LOGIN");
      setLoginText("login / signin");
      window.location.replace("");
    }
  };

  return (
    <div>
      <div>
        {items.map((singleItem: any, idx: any) => (
          <Block key={idx} className="items-start gap-[25px] py-4 px-4">
            <singleItem.icon className="h-6 w-6" />
            <Link to={singleItem.href} className="text-white text-[18px]">
              {singleItem.title}
            </Link>
          </Block>
        ))}
      </div>
      <div onClick={handleLogout} className="px-4 mt-10 py-3 gap-2 justify-center items-center text-white font-medium text-[16px] rounded-md flex flex-row bg-[#8000FF]">
        <Image src={LoginLogo} />
        {loginText}
      </div>
      <div className="flex flex-col mt-4 text-[14px] justify-center items-center text-center">
        <div>Privacy Policy • Terms of Services</div>
      </div>
    </div>
  );
}

const Wrapper = styled.div`
  .my-drawer {
    height: 100%;
    transition: margin-right 0.3s cubic-bezier(0.82, 0.85, 0.395, 0.895);
    overflow: hidden;
    width: 100%;
    z-index: 200;
  }

  .my-drawer-container {
    position: relative;
    height: 100%;
    width: 80%;
    padding: 0 1.2rem;
  }

  .close-icon {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }

  .drawer-closed {
    margin-right: -100%;
  }

  .drawer-opened {
    margin-right: 0%;
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style: none;

    & > *:not(:last-child) {
      margin-bottom: 3rem;
    }
  }
`;
