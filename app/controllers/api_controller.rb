class ApiController < ApplicationController
  def autocomplete
    completions = GPT3::Completion.create(prompt_params, gpt_3_settings)
      .fetch('choices', [])
      .map { |choice| choice.fetch('text') }

    render json: completions
  end

  private

  def prompt_params
    params.require(:prompt)
  end

  def gpt_3_settings
    {
      n:           3,
      max_tokens:  128,
      temperature: 0.75
    }
  end
end
