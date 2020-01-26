import React from "react";
import { ColumnProps } from "antd/lib/table";
import { Table, Icon, Button } from "antd";
import "antd/dist/antd.css";
import { IPokemonShort } from "../../../model/pokemon/PokemonShort";

export interface IPokemonViewOwnProps {
  pokemonList: IPokemonShort[];
  numOfElements: number;
  onRowClick: (record: string) => void;
  onHandleFavorites: (record: IPokemonShort) => void;
  onPageChange: (page: number) => void;
}
type IPokemonViewProps = IPokemonViewOwnProps;

interface IPokemonViewState {}

class PokemonView extends React.Component<
  IPokemonViewProps,
  IPokemonViewState
> {
  state: IPokemonViewState = {};

  handleFavorites = (record: IPokemonShort) => {
    if (record.isFavorite === undefined) {
      record.isFavorite = true;
    } else {
      record.isFavorite = !record.isFavorite;
    }

    this.props.onHandleFavorites(record);
  };

  handleRowCLick = (record: IPokemonShort) => {
    this.props.onRowClick(record.url);
  };

  handlePageChange = (page: number) => {
    this.props.onPageChange(page);
  };

  render = () => {
    const columns: Array<ColumnProps<IPokemonShort>> = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "",
        key: "action",
        width: 50,
        render: (text, record) => (
          <div>
            <Button
              onClick={e => {
                e.stopPropagation();
                this.handleFavorites(record);
              }}
            >
              {record.isFavorite ? (
                <Icon type='delete'></Icon>
              ) : (
                <Icon type='star'></Icon>
              )}
            </Button>
          </div>
        )
      }
    ];

    return (
      <Table
        dataSource={
          this.props.pokemonList && this.props.pokemonList
            ? this.props.pokemonList
            : []
        }
        columns={columns}
        bordered={true}
        rowKey='name'
        pagination={{
          defaultPageSize: 10,
          simple: true,
          total: this.props.numOfElements,
          onChange: (page, pageSize) => {
            this.handlePageChange(page);
          }
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              this.handleRowCLick(record);
            }
          };
        }}
      />
    );
  };
}

export default PokemonView as any;
