# Easy Grants

Easy Grants power a novel Grant distribution program on Arbitrum using Allo Protocol.

## Aim

- Resource Allocation should be Democratised
- Support Open Source Projects on Arbitrum
- Drive Philanthropic endeavours
- Foster Decentralised Governance

## Allo Protocol

Allo comprises of 4 main piece of solidity code files.

- Allo.sol: Core contract that is ideally the only Contact for user interaction.
  - Create Pools
  - Fund and Manage Pools
  - Assign Allocation Strategy
- Registry.sol: Manages User Profile and associate permissions in Allo ecosystem.
- Anchor.sol: For every profile, registry creates an Anchor Contract that allows arbitrary calls to target addresses based on specific conditions.
- Base Strategy.sol: Takes care of following
  - Recipients: Grantees to Apply, Approved by Admin
  - Allocation: How the funds are allocated.
  - Payout: Quadratic Funding
  - Distribution: Individual donations as they come OR Lump Sum from the pool

## Flow of Funds

Accessed through Allo.sol

1. createPool()
2. fundPool()
3. allocate()
4. distribute()

## Allo Workflow

1. Users Create Profile and acquire necessary permissions --> Registry.sol
2. Profiles can createPool/ Allocate Funds/ Manage Pools using Allo.sol
3. Allo Checks the profile permissions using Registry
4. Allo Strategies takes care of Allocation, Distribution and Management of Funds
5. Anchor contract (profile) is used for dynamic execution of Arbitrary calls based on predefined conditions.
