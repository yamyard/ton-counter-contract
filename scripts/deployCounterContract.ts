import { toNano } from '@ton/core';
import { CounterContract } from '../wrappers/CounterContract';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const counterContract = provider.open(
        CounterContract.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('CounterContract')
        )
    );

    await counterContract.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(counterContract.address);

    console.log('ID', await counterContract.getID());
}
