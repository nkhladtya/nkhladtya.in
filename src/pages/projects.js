import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"

import Repository from "../components/repository"
import Layout from "../components/layout"
import Avatar from "../components/avatar"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLevelDownAlt } from "@fortawesome/free-solid-svg-icons"
import SEO from "../components/seo"

const Projects = ({ data }) => {
  const { repositories, name, avatarUrl, isHireable } = data.githubData.viewer

  return (
    <Layout title="NKHL ADTYA">
      <SEO title="Projects" />
      <Helmet>
        <title>Projects</title>
      </Helmet>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 800,
          paddingTop: 0,
        }}
      >
        <div
          className="avatar banner"
          style={{
            display: `flex`,
            alignItems: `center`,
            justifyContent: "center",
            textAlign: "center",
            margin: "1.45rem 0px",
            padding: "25px 0",
          }}
        >
          <Avatar img={avatarUrl} />
          <div className="resume">
            <h2 style={{ border: `none`, marginTop: 0 }}>{name}</h2>
            {isHireable && (
              <h3
                style={{
                  marginBottom: 0,
                  marginTop: 0,
                  fontSize: `24px`,
                  fontWeight: "lighter",
                }}
              >
                I'm Hireable{" "}
                <span role="img" aria-label="hand">
                  😎
                </span>
              </h3>
            )}
          </div>
        </div>
        <hr
          className="contour"
          style={{
            width: "80%",
          }}
        />
        <h3
          style={{
            textAlign: "center",
            fontWeight: "lighter",
            marginBottom: "15px",
          }}
        >
          Latest Projects{" "}
          <FontAwesomeIcon icon={faLevelDownAlt} className="icon-font" />
        </h3>
        {repositories.nodes
          .map(repo => <Repository key={repo.name} repo={repo} />)
          .reverse()}
      </div>

      <p style={{ textAlign: `center` }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nkhladtya?tab=repositories"
          className="link"
        >
          More on Github
        </a>
      </p>
    </Layout>
  )
}

export default Projects

export const gitHubQuery = graphql`
  {
    githubData {
      viewer {
        name
        avatarUrl
        isHireable
        resourcePath
        repositories(
          last: 12
          privacy: PUBLIC
          orderBy: { field: STARGAZERS, direction: ASC }
        ) {
          nodes {
            name
            description
            homepageUrl
            forkCount
            createdAt
            updatedAt
            resourcePath
            languages(last: 1, orderBy: { field: SIZE, direction: ASC }) {
              edges {
                node {
                  name
                  color
                }
              }
            }
            licenseInfo {
              name
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`
