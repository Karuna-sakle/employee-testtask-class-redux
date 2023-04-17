import React, { Component } from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default class PageLoading extends Component {
  render() {
    return (
        <ThreeDots 
        height="30" 
        width="80" 
        radius="4"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
         />
    )
  }
}
