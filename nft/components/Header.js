import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'; // Dynamic routing

export default function Header() {
  return (
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
      <div className="ml-auto py-2 px-4">
        <ConnectButton />
      </div>

      <div className="flex flex-row items-center">
        <Link href={`/CreateNFT`}>
          <a className="mr-4 p-6">Create NFT</a>
        </Link>
      </div>
    </nav>
  );
}
