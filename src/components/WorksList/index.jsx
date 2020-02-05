import React, { useMemo, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import "@utils/fragments.js";

import {
  Component,
  List,
  ListItem,
  LinkStyled,
  ListImage,
  ListImageComponent,
  TitleCard,
  TitleCardTitle,
  TitleCardType
} from "./styles";

function renderListItem(
  work,
  onClick,
  index,
  refItemLinks,
  handleItemOver,
  handleItemOut,
  currentZIndex
) {
  const { contentful_id, slug, image, thumbnail, title, type } = work;

  let itemImage = thumbnail ? thumbnail : image;
  return (
    <ListItem key={contentful_id} style={{ zIndex: currentZIndex - index }}>
      <LinkStyled
        to={`/work/${slug}`}
        onClick={onClick}
        onMouseEnter={handleItemOver}
        onMouseLeave={handleItemOut}
        ref={refItemLinks[index]}
        style={{
          transitionDuration: `${parseInt(Math.random() * 2000) + 800}ms`,
          transitionDelay: `${parseInt(Math.random() * 150)}ms`
        }}
      >
        <ListImageComponent>
          <ListImage fluid={itemImage.fluid} alt={itemImage.title} />
        </ListImageComponent>
        <TitleCard>
          <TitleCardTitle>{title}</TitleCardTitle>
          <TitleCardType>{type}</TitleCardType>
        </TitleCard>
      </LinkStyled>
    </ListItem>
  );
}

/**
 * Component definition
 * @param {Props} props
 */
const WorksList = ({ className, onClick, worksData, needFocus, styleType }) => {
  const data = useStaticQuery(graphql`
    query {
      contentfulWorkList(contentful_id: { eq: "1p5V0NNEhIoZedN0PVNirR" }) {
        ...workListFields
      }
    }
  `);
  const {
    contentfulWorkList: { works }
  } = data;
  let currentZIndex = 1000;

  if (!worksData) {
    worksData = works;
  }

  const componentRef = createRef();

  function handleItemOver(e) {
    e.currentTarget.classList.add("active");
    componentRef.current.classList.remove("notOver");
    componentRef.current.classList.add("hasOver");
  }
  function handleItemOut(e) {
    e.currentTarget.classList.remove("active");
    componentRef.current.classList.remove("hasOver");
    componentRef.current.classList.add("notOver");
  }

  const refItemLinks = useMemo(
    () => Array.from({ length: worksData.length }).map(() => createRef()),
    [worksData]
  );
  const listItems = worksData.map((work, index) =>
    renderListItem(
      work,
      onClick,
      index,
      refItemLinks,
      handleItemOver,
      handleItemOut,
      currentZIndex
    )
  );

  useEffect(() => {
    if (needFocus) {
      if (refItemLinks.length) {
        refItemLinks[0].current.focus();
      }
    }
  }, [needFocus, refItemLinks]);

  return (
    <Component ref={componentRef} className={`${styleType} ${className}`}>
      <List aria-label="List of works">{listItems}</List>
    </Component>
  );
};

WorksList.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  worksData: PropTypes.array,
  needFocus: PropTypes.bool,
  styleType: PropTypes.string
};

WorksList.defaultProps = {
  needFocus: false,
  styleType: "grid"
};

export default WorksList;
