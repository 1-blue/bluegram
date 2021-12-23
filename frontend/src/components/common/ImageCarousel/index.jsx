// 2021/12/23 - image-carousel ( 게시글 읽기 모달 and 게시글 생성 모달에 사용 ) - by 1-blue

import React, { useCallback, useEffect, useRef, useState } from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper } from "./style";

const ImageCarousel = ({ children, speed, length, height }) => {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const [imageNodes, setImageNodes] = useState(null);
  const [dotNodes, setDotNodes] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [click, setClick] = useState(true);

  // 2021/12/23 - 이미지 노드들 배열로 모아서 state에 넣는 함수 - by 1-blue
  useEffect(() => {
    setImageNodes([...wrapperRef.current.childNodes]);
  }, [wrapperRef.current]);

  // 2021/12/23 - 첫 이미지 지정 - by 1-blue
  useEffect(() => {
    imageNodes?.forEach(imageNode => (imageNode.style.transform = `translateX(-${currentIndex * 100}%)`));
    setTimeout(() => {
      imageNodes?.forEach(imageNode => (imageNode.style.transition = `all ${speed}ms`));
    }, 100);
  }, [imageNodes]);

  // 2021/12/23 - 다음 이미지로 넘기는 함수 - by 1-blue
  const onClickNextButton = useCallback(() => {
    if (!click) return;

    // dot 모두 초기화 ( 이전에 이동이 앞인지 뒤인지 알 수 없으니 모두 초기화 )
    dotNodes.forEach(dotNode => (dotNode.style.color = "white"));

    // 이미지 변경
    imageNodes.forEach(imageNode => (imageNode.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`));
    setCurrentIndex(prev => (prev + 1 === imageNodes.length - 1 ? 1 : prev + 1));

    // 마지막 이미지에서 다음버튼을 누를 경우 실행
    if (currentIndex + 1 === imageNodes.length - 1) {
      setClick(false);
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transition = `all 0s`));
      }, 900);
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transform = `translateX(-${1 * 100}%)`));
      }, 1000);
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transition = `all ${speed}ms`));
        setClick(true);
      }, 1010);

      // 현재 이미지와 dot 동기화
      dotNodes[currentIndex - length].style.color = "black";
    } else {
      // 현재 이미지와 dot 동기화
      dotNodes[currentIndex].style.color = "black";
    }
  }, [imageNodes, currentIndex, click, dotNodes, length]);

  // 2021/12/23 - 이전 이미지로 넘기는 함수 - by 1-blue
  const onClickPrevButton = useCallback(() => {
    if (!click) return;

    // dot 모두 초기화 ( 이전에 이동이 앞인지 뒤인지 알 수 없으니 모두 초기화 )
    dotNodes.forEach(dotNode => (dotNode.style.color = "white"));

    imageNodes.forEach(imageNode => (imageNode.style.transform = `translateX(-${(currentIndex - 1) * 100}%)`));
    setCurrentIndex(prev => (prev - 1 === 0 ? imageNodes.length - 2 : prev - 1));

    // 첫 이미지에서 이전버튼을 누를 경우 실행
    if (currentIndex - 1 === 0) {
      setClick(false);
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transition = `all 0s`));
      }, 250);
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transform = `translateX(-${(imageNodes.length - 2) * 100}%)`));
      }, 500);
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transition = `all ${speed}ms`));
        setClick(true);
      }, 510);
      // 현재 이미지와 dot 동기화
      dotNodes[length - 1].style.color = "black";
    } else {
      // 현재 이미지와 dot 동기화
      dotNodes[currentIndex - 2].style.color = "black";
    }
  }, [imageNodes, currentIndex, click, dotNodes, length]);

  // 2021/12/23 - dot 노드들 배열로 모아서 state에 넣는 함수들 - by 1-blue
  useEffect(() => {
    setDotNodes([...dotRef.current.childNodes]);
  }, [dotRef.current]);

  // 2021/12/23 - 첫 이미지와 dot 동기화 - by 1-blue
  useEffect(() => {
    if (!dotNodes) return;
    dotNodes[0].style.color = "black";
  }, [dotNodes]);

  return (
    <Wrapper height={height}>
      {/* 이미지들 */}
      <ul ref={wrapperRef} className="image-container">
        {children}
      </ul>

      {/* 이미지 이동 버튼 */}
      <button type="button" onClick={onClickNextButton} className="next-button">
        {">"}
      </button>
      <button type="button" onClick={onClickPrevButton} className="prev-button">
        {"<"}
      </button>

      {/* 이미지 현재 위치를 표시하는 노드들 */}
      <ul className="dots" ref={dotRef}>
        {Array(length)
          .fill()
          .map((v, i) => (
            <li key={i}>•</li>
          ))}
      </ul>

      <span className="image-number">{`${currentIndex} / ${length}`}</span>
    </Wrapper>
  );
};

ImageCarousel.propTypes = {
  children: Proptypes.node.isRequired,
  speed: Proptypes.number,
  height: Proptypes.number,
};

ImageCarousel.defaultProps = {
  speed: 1000,
  height: 100,
};

export default ImageCarousel;
