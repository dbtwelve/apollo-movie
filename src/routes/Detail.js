import React from "react"
import { useParams } from "react-router-dom"
import {gql} from "apollo-boost"
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";


const GET_MOVIE = gql`
    query getMovie($id: Int!){
        movie(id: $id){
            id
            title
            medium_cover_image
            description_intro
            language
            rating
            isLiked @client
        }
        suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`


const Frame = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;

`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;

  @media only screen and (max-width: 768px) {
    height: auto;
    display: grid;
    justify-content: center;
  }

`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;

  @media only screen and (max-width: 768px) {
    font-size: 25px;
  }
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;

  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-size: 28px;

  @media only screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;

  @media only screen and (max-width: 768px) {
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;


const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  width: 90%;
  position: inherit;
  top: -50px;

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default () => {
    const { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: {id: parseInt(id)}
    });
    return (
        <Frame>
        <Container>
          <Column>
          <Title>{loading ? "Loading..." : `${data.movie.title} ${data.movie.isLiked ? "💖" : "😞"}`}</Title>
            <Subtitle>
            {data?.movie?.language} · {data?.movie?.rating}
            </Subtitle>
            <Description>{data?.movie?.description_intro}</Description>
          </Column>
          <Poster bg={data?.movie?.medium_cover_image}></Poster>
          
        </Container>
        <Title>Suggestions</Title>
        <Movies>
        
              {data?.suggestions?.map(s => (
              <Movie 
                  key={s.id} 
                  id={s.id} 
                  bg={s.medium_cover_image} 
              />
              ))}
          </Movies>
        </Frame>
        
      );
    
};