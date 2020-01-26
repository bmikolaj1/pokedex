import React from "react";
import { Modal, Form, Input, Avatar } from "antd";
import "antd/dist/antd.css";
import { IPokemon } from "../../../model/pokemon/Pokemon";
import { FormComponentProps } from "antd/lib/form";

export interface IPokemonDetailsViewOwnProps {
  pokemon?: IPokemon;
  onClose: () => void;
}
type IPokemonDetailsViewProps = IPokemonDetailsViewOwnProps &
  FormComponentProps;

interface IPokemonDetailsViewState {}

class PokemonDetailsView extends React.Component<
  IPokemonDetailsViewProps,
  IPokemonDetailsViewState
> {
  state: IPokemonDetailsViewState = {};

  componentDidMount() {
    if (this.props.pokemon) {
      const { form } = this.props;
      let abilities: string = "";
      let moves: string = "";
      for (let ability of this.props.pokemon.abilities) {
        abilities += `${ability.ability.name}, `;
      }

      for (let move of this.props.pokemon.moves) {
        moves += `${move.move.name}, `;
      }

      form.setFieldsValue({
        name: this.props.pokemon.name,
        height: this.props.pokemon.height,
        weight: this.props.pokemon.weight,
        abilities: abilities.substring(0, abilities.length - 2),
        moves: moves.substring(0, moves.length - 2)
      });
    }
  }

  render = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const defaultImage = require("../../../image/pokeball.png");
    return (
      <Modal
        style={{ top: 20 }}
        title={
          <span>
            <Avatar
              size='large'
              src={
                this.props.pokemon?.sprites.front_shiny
                  ? this.props.pokemon.sprites.front_shiny
                  : defaultImage
              }
            ></Avatar>
            {this.props.pokemon?.name}
          </span>
        }
        visible={true}
        onOk={() => this.props.onClose()}
        onCancel={() => this.props.onClose()}
      >
        <Form {...formItemLayout}>
          <Form.Item label='Name'>
            {getFieldDecorator("name", {
              rules: []
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label='Height'>
            {getFieldDecorator("height", {
              rules: []
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label='weight'>
            {getFieldDecorator("weight", {
              rules: []
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label='Abilities'>
            {getFieldDecorator("abilities", {
              rules: []
            })(<Input disabled />)}
          </Form.Item>
          <Form.Item label='Moves'>
            {getFieldDecorator("moves", {
              rules: []
            })(<Input.TextArea disabled />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  };
}

export default Form.create<IPokemonDetailsViewProps>()(
  PokemonDetailsView as any
);
