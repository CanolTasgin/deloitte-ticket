import React from "react";
import { Pagination as PageComp } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const Numbers = ({ totalPages, num }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let currentKeyword = searchParams.get("keyword") || "";

  let nums = [];
  let max = 99;
  if (totalPages < 99) {
    max = totalPages;
  }
  if (totalPages <= 7) {
    for (let i = 2; i <= totalPages - 1; i++) {
      if (i === num) {
        nums.push(
          <PageComp.Item key={i} active>
            {i}
          </PageComp.Item>
        );
      } else {
        nums.push(
          <PageComp.Item
            onClick={() =>
              setSearchParams({ keyword: currentKeyword, page: i })
            }
            key={i}
          >
            {i}
          </PageComp.Item>
        );
      }
    }
  } else {
    //if left sided
    if (num <= 4) {
      for (let i = 2; i <= 6; i++) {
        if (i === num) {
          nums.push(
            <PageComp.Item key={i} active>
              {i}
            </PageComp.Item>
          );
        } else {
          nums.push(
            <PageComp.Item
              onClick={() =>
                setSearchParams({ keyword: currentKeyword, page: i })
              }
              key={i}
            >
              {i}
            </PageComp.Item>
          );
        }
      }
      nums.push(
        <PageComp.Ellipsis
          onClick={() => setSearchParams({ keyword: currentKeyword, page: 7 })}
          key={7}
        />
      );
    }
    // if middle
    else if (num >= 4 && num < max - 3) {
      nums.push(
        <PageComp.Ellipsis
          onClick={() =>
            setSearchParams({ keyword: currentKeyword, page: num - 3 })
          }
          key={num - 3}
        />
      );
      for (let i = num - 2; i <= num + 2; i++) {
        if (i === num) {
          nums.push(
            <PageComp.Item key={i} active>
              {i}
            </PageComp.Item>
          );
        } else {
          nums.push(
            <PageComp.Item
              onClick={() =>
                setSearchParams({ keyword: currentKeyword, page: i })
              }
              key={i}
            >
              {i}
            </PageComp.Item>
          );
        }
      }
      nums.push(
        <PageComp.Ellipsis
          onClick={() =>
            setSearchParams({ keyword: currentKeyword, page: num + 3 })
          }
          key={num + 3}
        />
      );
    } else {
      //if right sided
      nums.push(
        <PageComp.Ellipsis
          onClick={() =>
            setSearchParams({ keyword: currentKeyword, page: max - 6 })
          }
          key={max - 6}
        />
      );
      for (let i = max - 5; i <= max - 1; i++) {
        if (i === num) {
          nums.push(
            <PageComp.Item key={i} active>
              {i}
            </PageComp.Item>
          );
        } else {
          nums.push(
            <PageComp.Item
              onClick={() =>
                setSearchParams({ keyword: currentKeyword, page: i })
              }
              key={i}
            >
              {i}
            </PageComp.Item>
          );
        }
      }
    }
  }
  return nums;
};

const Pagination = ({ pageInfo }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  let currentKeyword = searchParams.get("keyword") || "";

  function setParams(numb) {
    setSearchParams({ keyword: currentKeyword, page: numb });
  }
  console.log("pagination", pageInfo);

  return (
    <>
      <PageComp>
        {pageInfo.number - 1 >= 0 ? (
          <>
            <PageComp.First onClick={() => setParams(1)} />
            <PageComp.Prev onClick={() => setParams(pageInfo.number)} />
          </>
        ) : (
          <>
            <PageComp.First disabled />
            <PageComp.Prev disabled />
          </>
        )}
        <PageComp.Item
          onClick={() => setSearchParams({ keyword: currentKeyword, page: 1 })}
          key={1}
          active={pageInfo.number === 0}
        >
          {1}
        </PageComp.Item>

        <Numbers totalPages={pageInfo.totalPages} num={pageInfo.number + 1} />

        <PageComp.Item
          onClick={() =>
            setSearchParams({
              keyword: currentKeyword,
              page: pageInfo.totalPages > 99 ? 99 : pageInfo.totalPages,
            })
          }
          key={pageInfo.totalPages}
          active={
            pageInfo.number === pageInfo.totalPages - 1 ||
            pageInfo.number === 98
          }
        >
          {pageInfo.totalPages > 99 ? 99 : pageInfo.totalPages}
        </PageComp.Item>

        {pageInfo.number + 1 <
        (pageInfo.totalPages > 99 ? 99 : pageInfo.totalPages) ? (
          <>
            <PageComp.Next onClick={() => setParams(pageInfo.number + 2)} />

            <PageComp.Last
              onClick={() =>
                setParams(pageInfo.totalPages > 99 ? 99 : pageInfo.totalPages)
              }
            />
          </>
        ) : (
          <>
            <PageComp.Next disabled />
            <PageComp.Last disabled />
          </>
        )}
      </PageComp>
    </>
  );
};

export default Pagination;
