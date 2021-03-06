import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Card from '../components/card'
import Modal from '../components/modal'
const Home: NextPage = () => {
  const [awardsList, setAwardsList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [show, setShow] = useState(false)
  async function getAwardsList() {
    const res = await fetch("http://localhost:3000/api/ballots");
    const list = await res.json();
    setAwardsList(list.items);
  }

  useEffect(() => {
    getAwardsList();
  }, []);


  const handleItemSelection = (nominee, categoryid, p_index) => {
    //debugger;
    //console.log(nomineeid, categoryid, p_index);
    let newSelectedItems = [...selectedItems];
    let obj = { catid: categoryid, item: nominee };
    newSelectedItems[p_index] = obj;
    setSelectedItems([...newSelectedItems]);
  };
  const isSelected = (id) => {
    return selectedItems.findIndex(o => o && o.item.id === id) >= 0 ? true : false
  }
  const handleClose = (status) => {
    setShow(status)
    setSelectedItems([])
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Take Home Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="row">
        <h3 className="title">
          AWARDS 2021
        </h3>

        {awardsList.map((val, p_topIndex) => {
          return (
            <div key={p_topIndex}>
              <div className="category-title">{val.title}</div>
              <div className="row">
                {val.items &&
                  val.items.map((nominee, idx) => {
                    return (
                      <Card
                        key={idx}
                        selected={isSelected(nominee.id)}
                        handleItemSelection={handleItemSelection}
                        nominee={nominee}
                        catIndex={p_topIndex}
                        catId={val.id}
                      />
                    );
                  })}
              </div>
              {p_topIndex == awardsList.length - 1 ?
                <div className="float-right">
                  <button type="button" className="btn-submit" onClick={() => setShow(true)}>SUBMIT BALLOT BUTTON</button>
                </div>
                : <></>
              }
            </div>
          );
        })}

      </main>
      <Modal
        isVisible={show}
        close={handleClose}
        selectedItems={selectedItems}
      />
    </div>
  );
};

export default Home;
