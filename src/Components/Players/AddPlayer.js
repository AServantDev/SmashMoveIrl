import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { PlayersContext } from "../../App";

export default function AddPlayer() {
  const { addPlayers } = useContext(PlayersContext);

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: { name: "" },
  });

  return (
    <div>
      <div className="card-body">
        <form onSubmit={handleSubmit(addPlayers)}>
          <div className="form-group">
            <label htmlFor="name" />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Entrez un nom"
              name="name"
              ref={register({ required: true, maxLength: 20 })}
            />
          </div>
          <input
            type="submit"
            value="addPlayer"
            className="btn btn-block btn-primary"
          />
        </form>
      </div>
    </div>
  );
}
