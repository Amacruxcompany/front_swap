import { WagmiContainerComponent } from "./components/utils/wagmiContainer";
import { getPoolService } from "./services/getDataServices";

export default async function Home(props) {
  const pools = await getPoolService();

  return (
    <main className="min-h-screen bg-fondTwo overflow-y-scroll">
      <WagmiContainerComponent pools={pools} />
    </main>
  );
}
