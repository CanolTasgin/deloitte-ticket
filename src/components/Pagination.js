import React from "react";
import { Pagination as PageComp } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const Numbers = ({ totalPages, num }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let currentKeyword = searchParams.get("keyword") || "";

  let nums = [];
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
    else if (num >= 4 && num < totalPages - 3) {
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
    }
    // if right sided
    else {
      nums.push(
        <PageComp.Ellipsis
          onClick={() =>
            setSearchParams({ keyword: currentKeyword, page: totalPages - 6 })
          }
          key={totalPages - 6}
        />
      );
      for (let i = totalPages - 5; i <= totalPages - 1; i++) {
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
              page: pageInfo.totalPages,
            })
          }
          key={pageInfo.totalPages}
          active={pageInfo.number === pageInfo.totalPages - 1}
        >
          {pageInfo.totalPages}
        </PageComp.Item>

        {pageInfo.number + 1 < pageInfo.totalPages ? (
          <>
            <PageComp.Next onClick={() => setParams(pageInfo.number + 2)} />

            <PageComp.Last onClick={() => setParams(pageInfo.totalPages)} />
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
