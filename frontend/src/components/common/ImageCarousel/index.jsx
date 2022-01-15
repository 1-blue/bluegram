/**
 * 생성일: 2022/01/13
 * 수정일: 2022/01/14 ( 끝에서 이미지 넘길때 버그 수정, 외부에서 현재 이미지의 인덱스 얻을 수 있도록 수정 )
 * 작성자: 1-blue
 *
 * 직접 만들어본 Image-Carousel ( 속도와 이미지명이 들어있는 배열만 넘겨주면 됨 )
 *
 * - 필요 사항
 * 1. dot의 위치가 제대로 안 잡히는 경우가 있어서 원인 찾고 해결해야 함
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Proptypes from "prop-types";

// styled-components
import { Wrapper, Image } from "./style";

const ImageCarousel = ({ speed, images, imageNumber, setImageNumber, $preview }) => {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const [imageNodes, setImageNodes] = useState(null);
  const [dotNodes, setDotNodes] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(images.length > 1 ? imageNumber + 1 : 0);
  const [click, setClick] = useState(true);
  const imageUrl = useMemo(
    () => ($preview ? process.env.NEXT_PUBLIC_PREVIEW_IMAGE_URL : process.env.NEXT_PUBLIC_IMAGE_URL),
    [$preview],
  );

  // 2021/12/23 - 이미지 노드들 배열로 모아서 state에 넣는 함수 - by 1-blue
  useEffect(() => {
    if (images.length === 1) return;
    setImageNodes([...wrapperRef.current.childNodes]);
  }, [images, wrapperRef.current]);

  // 2021/12/23 - 첫 이미지 지정 - by 1-blue
  useEffect(() => {
    if (images.length === 1) return;
    imageNodes?.forEach(imageNode => (imageNode.style.transform = `translateX(-${currentIndex * 100}%)`));
    setTimeout(() => {
      imageNodes?.forEach(imageNode => (imageNode.style.transition = `all ${speed}ms`));
    }, 100);
  }, [images, imageNodes]);

  // 2021/12/23 - 다음 이미지로 넘기는 함수 - by 1-blue
  const onClickNextButton = useCallback(() => {
    if (!click) return;

    // dot 모두 초기화 ( 이전에 이동이 앞인지 뒤인지 알 수 없으니 모두 초기화 )
    dotNodes.forEach(dotNode => (dotNode.style.color = "white"));

    // 다음 이미지로 변경
    imageNodes.forEach(imageNode => (imageNode.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`));
    setCurrentIndex(prev => prev + 1);

    // 마지막 이미지에서 다음버튼을 누를 경우 실행
    if (currentIndex + 1 === imageNodes.length - 1) {
      setClick(false);
      // 애니메이션 끄고
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transition = `all 0s`));
      }, speed - 100);
      // 마지막 이미지 -> 처음 + 1 이미지로 이동
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transform = `translateX(-${1 * 100}%)`));
      }, speed);
      // 애니메이션 다시 키고 인덱스값 동기화하기
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transition = `all ${speed}ms`));
        setCurrentIndex(1);
        setClick(true);
      }, speed + 100);

      // 현재 이미지와 dot 동기화
      dotNodes[currentIndex - images.length].style.color = "gray";
    } else {
      // 현재 이미지와 dot 동기화
      dotNodes[currentIndex].style.color = "gray";
    }
  }, [imageNodes, currentIndex, click, dotNodes, images, speed]);

  // 2021/12/23 - 이전 이미지로 넘기는 함수 - by 1-blue
  const onClickPrevButton = useCallback(() => {
    if (!click) return;

    // dot 모두 초기화 ( 이전에 이동이 앞인지 뒤인지 알 수 없으니 모두 초기화 )
    dotNodes.forEach(dotNode => (dotNode.style.color = "white"));

    imageNodes.forEach(imageNode => (imageNode.style.transform = `translateX(-${(currentIndex - 1) * 100}%)`));
    setCurrentIndex(prev => prev - 1);

    // 첫 이미지에서 이전버튼을 누를 경우 실행
    if (currentIndex - 1 === 0) {
      setClick(false);
      // 애니메이션 끄기
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transition = `all 0s`));
      }, speed - 100);
      // 처음 이미지 -> 마지막 - 1 이미지로 이동
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transform = `translateX(-${(imageNodes.length - 2) * 100}%)`));
      }, speed);
      // 애니메이션 다시 키고 인덱스 동기화
      setTimeout(() => {
        imageNodes.forEach(imageNode => (imageNode.style.transition = `all ${speed}ms`));
        setCurrentIndex(imageNodes.length - 2);
        setClick(true);
      }, speed + 100);
      // 현재 이미지와 dot 동기화
      dotNodes[images.length - 1].style.color = "gray";
    } else {
      // 현재 이미지와 dot 동기화
      dotNodes[currentIndex - 2].style.color = "gray";
    }
  }, [imageNodes, currentIndex, click, dotNodes, images, speed]);

  // 2021/12/23 - dot 노드들 배열로 모아서 state에 넣는 함수들 - by 1-blue
  useEffect(() => {
    if (images.length === 1) return;
    setDotNodes([...dotRef.current.childNodes]);
  }, [images, dotRef.current]);

  // 2022/01/14 - 현재 이미지 동기화 ( 외부에서 사용 ) - by 1-blue
  useEffect(() => {
    if (!setImageNumber) return;
    setImageNumber(currentIndex);
  }, [setImageNumber, currentIndex]);

  // 2022/01/14 - 이미지를 여러개 올리고나서 제거할 경우 - by 1-blue
  useEffect(() => {
    if (images.length !== 1) return;
    wrapperRef.current.childNodes[0].style.transition = "all 0s";
    wrapperRef.current.childNodes[0].style.transform = "none";
  }, [images, wrapperRef.current]);

  return (
    <Wrapper className="image-carousel">
      {/* 이미지들 : 이미지가 두개 이상이라면 처음과 마지막에 마지막과 처음 이미지 추가 ( 무한 회전을 위함 )*/}
      <ul ref={wrapperRef} className="image-container">
        {images.length === 1 ? (
          <>
            <li>
              <Image name={imageUrl + "/" + images[0].name}>
                <img src={imageUrl + "/" + images[0].name} alt="게시글의 이미지" />
              </Image>
            </li>
          </>
        ) : (
          <>
            <li>
              <Image name={imageUrl + "/" + images[images.length - 1].name}>
                <img src={imageUrl + "/" + images[images.length - 1].name} alt="게시글의 이미지" />
              </Image>
            </li>
            {images.map(image => (
              <li key={image._id}>
                <Image name={imageUrl + "/" + image.name}>
                  <img src={imageUrl + "/" + image.name} alt="게시글의 이미지" />
                </Image>
              </li>
            ))}
            <li>
              <Image name={imageUrl + "/" + images[0].name}>
                <img src={imageUrl + "/" + images[0].name} alt="게시글의 이미지" />
              </Image>
            </li>
          </>
        )}
      </ul>

      {/* 이미지가 여러 개라면 버튼과 dot 추가 */}
      {images.length === 1 || (
        <>
          {/* 이미지 이동 버튼 */}
          <button type="button" onClick={onClickNextButton} className="next-button">
            {">"}
          </button>
          <button type="button" onClick={onClickPrevButton} className="prev-button">
            {"<"}
          </button>

          {/* 이미지 현재 위치를 표시하는 노드들 */}
          <ul className="dots" ref={dotRef}>
            {Array(images.length)
              .fill()
              .map((v, i) => (
                <li key={i}>•</li>
              ))}
          </ul>

          <span className="image-number">{`${currentIndex} / ${images.length}`}</span>
        </>
      )}
    </Wrapper>
  );
};

ImageCarousel.propTypes = {
  speed: Proptypes.number,
  images: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.number,
      name: Proptypes.string,
    }),
  ).isRequired,
  imageNumber: Proptypes.number,
  setImageNumber: Proptypes.func,
  $preview: Proptypes.bool,
};

ImageCarousel.defaultProps = {
  speed: 1000,
  imageNumber: 1,
};

export default ImageCarousel;
