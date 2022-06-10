import React from 'react';

const List = ({ items, removeItem, editItem}) => {
   
    return (
        <div className="grocery-list">
            {items.map((ite) => {
                    const { id, title } = ite;
                    return (
                        <article className="article-list" key={id}>
                            <h4 className="single-list">{title}</h4>
                            <div className="btn-control">
                                <button className="edit-btn" onClick={() => editItem (id)}>📝</button>
                                <span> | </span>
                                <button className="delete-btn" onClick={() =>removeItem(id)}>❌</button>
                            </div>

                        </article>
                    )
                })

            }
        </div>
    );
};

export default List;


