import * as FormPrimitive from '@radix-ui/react-form'
import classNames from 'classnames'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { insertTip } from '../../utils/supabase/supabase'
import { Tables, TablesInsert } from '../../utils/supabase/types'
import { Select } from '../Select/Select'
import { Spacer } from '../Spacer/Spacer'
import styles from './Form.module.css'

interface FormProps {
  categories: Tables<'categories'>[]
}

export const Form = ({ categories }: FormProps) => {
  const [category, setCategory] = useState(4)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const onSubmit = async (params: TablesInsert<'tips'>) => {
    setIsError(false)
    setIsSuccess(false)
    setIsLoading(true)

    try {
      const res = await insertTip(params)
      if (res.error) {
        throw new Error(res.error?.message)
      }
      setIsSuccess(true)
    } catch {
      setIsError(true)
    }

    setIsLoading(false)
  }

  const onReset = () => {
    setCategory(4)
    setIsLoading(false)
    setIsSuccess(false)
    setIsError(false)
  }

  if (isSuccess) {
    return (
      <div className={styles.wrapper}>
        <center>
          <p className="text-md">
            Thank you for sharing! Your tip has been added to the{' '}
            <Link className="font-bold" to="/">
              guide
            </Link>
            .
          </p>
          <Spacer size={32} />
          <button
            className={classNames('text-base font-bold', styles.button)}
            onClick={onReset}
          >
            Submit another tip
          </button>
        </center>
      </div>
    )
  }

  return (
    <FormPrimitive.Root
      className={styles.wrapper}
      onSubmit={(event) => {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { control_question, ...data } = Object.fromEntries(
          new FormData(event.currentTarget),
        )
        onSubmit({ ...data, category } as TablesInsert<'tips'>)
      }}
    >
      <h2 className="text-md">Basic info</h2>
      <Spacer size={32} />
      <div>
        <div className={styles.row}>
          <span className="text-base">Category *</span>
        </div>
        <Spacer size={8} />
        <Select
          value={`${category}`}
          onValueChange={(category) => {
            if (category) {
              setCategory(Number(category))
            }
          }}
          items={categories.map((category) => ({
            label: category.label,
            value: `${category.id}`,
          }))}
        />
      </div>
      <Spacer size={32} />
      <FormField label="Title" name="title" required />
      <Spacer size={32} />
      <FormField
        label="Description"
        name="description"
        required
        type="textarea"
      />
      <Spacer size={32} />
      <FormField label="Your name" name="created_by" required />
      <Spacer size={64} />
      <h2 className="text-md">Optional info</h2>
      <Spacer size={32} />
      <FormField label="Image URL" name="image_url" type="url" />
      <Spacer size={32} />
      <FormField label="Website URL" name="website_url" type="url" />
      <Spacer size={32} />
      <FormField label="Google Maps URL" name="google_maps_url" type="url" />
      <Spacer size={64} />
      <h2 className="text-md">Control question</h2>
      <Spacer size={32} />
      <FormField
        customMatcher={(value) => value.toLowerCase() !== 'antenna'}
        label="What is the name of the insect data platform led by Mila?"
        name="control_question"
        required
      />
      <Spacer size={64} />
      <FormPrimitive.Submit asChild>
        <button
          className={classNames('text-base font-bold', styles.button)}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit!'}
        </button>
      </FormPrimitive.Submit>
      {isError && <p>Uh oh, something went wrong!</p>}
    </FormPrimitive.Root>
  )
}

const FormField = ({
  customMatcher,
  label,
  name,
  required,
  type = 'text',
}: {
  customMatcher?: (value: string) => boolean
  label: string
  name: string
  required?: boolean
  type?: 'text' | 'url' | 'textarea'
}) => (
  <FormPrimitive.Field name={name}>
    <div className={styles.row}>
      <FormPrimitive.Label className="text-base">
        {label}
        {required ? ' *' : ''}
      </FormPrimitive.Label>
      <FormPrimitive.Message className="text-sm" match="valueMissing">
        Please provide a value
      </FormPrimitive.Message>
      <FormPrimitive.Message className="text-sm" match="typeMismatch">
        Please provide a valid value
      </FormPrimitive.Message>
      {customMatcher && (
        <FormPrimitive.Message className="text-sm" match={customMatcher}>
          Please provide a valid value
        </FormPrimitive.Message>
      )}
    </div>
    <Spacer size={8} />
    <FormPrimitive.Control asChild>
      {type === 'textarea' ? (
        <textarea
          className={classNames('text-base', styles.input)}
          required={required}
        />
      ) : (
        <input
          className={classNames('text-base', styles.input)}
          type={type}
          required={required}
        />
      )}
    </FormPrimitive.Control>
  </FormPrimitive.Field>
)
