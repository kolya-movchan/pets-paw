import React from 'react'
import { TopNavBar } from '../../components/TopNavBar/TopNavBar'
import VotingBoard from '../../features/VotingBoard/VotingBoard'

export const Voting = () => {
  return (
    <div className="side-container-menu">
      <TopNavBar />
      <VotingBoard />
    </div>
  )
}
