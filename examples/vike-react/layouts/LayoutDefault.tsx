import './style.css';
import React from 'react';
import logoUrl from '../assets/logo.svg';
import { Link } from '../components/Link';

const LayoutDefault = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 900,
        margin: 'auto'
      }}
    >
      <Sidebar>
        <Logo />
        <Link href="/">Welcome</Link>
        <Link href="/star-wars">Data Fetching</Link>
      </Sidebar>
      <Content>{children}</Content>
    </div>
  );
}

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      id="sidebar"
      style={{
        padding: 20,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1.8em',
        borderRight: '2px solid #eee'
      }}
    >
      {children}
    </div>
  )
}

const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="page-container">
      <div
        id="page-content"
        style={{
          padding: 20,
          paddingBottom: 50,
          minHeight: '100vh'
        }}
      >
        {children}
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10
      }}
    >
      <a href="/">
        <img src={logoUrl} height={64} width={64} />
      </a>
    </div>
  );
}

export default LayoutDefault;